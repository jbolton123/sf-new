const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from current directory
app.use(express.static(__dirname));

// Route for calendar
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'calendar.html'));
});

// Fallback for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'calendar.html'));
});

app.listen(PORT, () => {
  console.log(`🎉 Social Calendar running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
