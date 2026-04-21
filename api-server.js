const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Initialize database
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description TEXT,
        budget VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS attendees (
        id SERIAL PRIMARY KEY,
        event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(event_id, email)
      );
    `);

    console.log('✅ Database tables ready');
  } catch (err) {
    console.error('Database init error:', err);
  }
}

// API Routes

// Get all events with attendee counts
app.get('/api/events', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        e.*,
        COALESCE(json_agg(
          json_build_object('id', a.id, 'name', a.name, 'email', a.email, 'timestamp', a.created_at)
        ) FILTER (WHERE a.id IS NOT NULL), '[]') as attendees
      FROM events e
      LEFT JOIN attendees a ON e.id = a.event_id
      GROUP BY e.id
      ORDER BY e.date ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Get events error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get single event with attendees
app.get('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT
        e.*,
        COALESCE(json_agg(
          json_build_object('id', a.id, 'name', a.name, 'email', a.email, 'timestamp', a.created_at)
        ) FILTER (WHERE a.id IS NOT NULL), '[]') as attendees
      FROM events e
      LEFT JOIN attendees a ON e.id = a.event_id
      WHERE e.id = $1
      GROUP BY e.id
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get event error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create new event
app.post('/api/events', async (req, res) => {
  try {
    const { title, date, time, location, description, budget } = req.body;

    const result = await pool.query(`
      INSERT INTO events (title, date, time, location, description, budget)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [title, date, time, location, description, budget]);

    const event = result.rows[0];
    event.attendees = [];

    res.status(201).json(event);
  } catch (err) {
    console.error('Create event error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update event
app.put('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, time, location, description, budget } = req.body;

    const result = await pool.query(`
      UPDATE events
      SET title = $1, date = $2, time = $3, location = $4, description = $5, budget = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `, [title, date, time, location, description, budget, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update event error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete event
app.delete('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted', event: result.rows[0] });
  } catch (err) {
    console.error('Delete event error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add attendee to event
app.post('/api/events/:id/attendees', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Check if already registered
    const existing = await pool.query(
      'SELECT * FROM attendees WHERE event_id = $1 AND email = $2',
      [id, email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Already registered for this event' });
    }

    // Add attendee
    const result = await pool.query(`
      INSERT INTO attendees (event_id, name, email)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [id, name, email]);

    // Get all attendees for this event
    const attendees = await pool.query(
      'SELECT id, name, email, created_at as timestamp FROM attendees WHERE event_id = $1 ORDER BY created_at ASC',
      [id]
    );

    res.status(201).json({
      attendee: result.rows[0],
      allAttendees: attendees.rows
    });
  } catch (err) {
    console.error('Add attendee error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Serve main calendar page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'calendar-db.html'));
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'ok', database: 'connected', time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected', error: err.message });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`🎉 Social Calendar API running on port ${PORT}`);
  console.log(`📅 Visit: http://localhost:${PORT}`);
  await initDatabase();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing database pool');
  pool.end(() => {
    console.log('Database pool closed');
    process.exit(0);
  });
});
