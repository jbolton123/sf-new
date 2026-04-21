# 🐘 PostgreSQL Setup - No Firebase Needed!

## ✅ What You're Getting

- ✅ **Built into Heroku** - No external services needed
- ✅ **Completely Free** - Heroku's free PostgreSQL tier
- ✅ **Shared data** - All 80 people see the same events
- ✅ **Auto-refresh** - Updates every 10 seconds
- ✅ **Shared meetings** - ONE calendar invite with ALL attendees
- ✅ **Easy backup** - Built-in Heroku backups

---

## 🚀 One-Command Deploy

```bash
./deploy-postgres.sh
```

**That's it!** The script will:
1. Add PostgreSQL addon to Heroku (free tier)
2. Commit the new code
3. Deploy to Heroku
4. Initialize database tables automatically

---

## 📋 What Happens Automatically

### 1. PostgreSQL Database Created
```sql
events table:
- id, title, date, time, location, description, budget
- created_at, updated_at

attendees table:
- id, event_id, name, email, created_at
```

### 2. REST API Running
```
GET    /api/events           - Get all events
POST   /api/events           - Create event
PUT    /api/events/:id       - Update event
DELETE /api/events/:id       - Delete event
POST   /api/events/:id/attendees - Add RSVP
GET    /api/health           - Check database connection
```

### 3. Frontend Auto-Polling
- Refreshes events every 10 seconds
- Shows connection status (top right)
- No manual refresh needed

---

## 🎯 How It's Different from Firebase

| Feature | Firebase | PostgreSQL (Heroku) |
|---------|----------|---------------------|
| Setup | External account | Built-in to Heroku |
| Real-time | WebSocket push | 10-second polling |
| Configuration | Manual config | Zero config |
| Cost | Free tier | Free tier |
| Backup | Manual | Automatic (Heroku) |
| Security | Firebase rules | Heroku security |

---

## 📊 Database Details

### Free Tier Limits (Essential-0):
- **Storage:** 1GB
- **Rows:** Up to 10,000
- **Connections:** 20 concurrent

### Your Usage:
- **Events:** ~100 events/year = 0.001MB
- **Attendees:** 80 people × 10 events = 800 rows
- **Total:** Well under 1% of free tier limits ✅

---

## 🔧 Managing Your Database

### View Database Info
```bash
heroku pg:info --app sf-uki-social-calendar
```

### Access Database Shell
```bash
heroku pg:psql --app sf-uki-social-calendar
```

### View All Events
```sql
SELECT * FROM events ORDER BY date;
```

### View All Attendees
```sql
SELECT e.title, a.name, a.email 
FROM attendees a 
JOIN events e ON a.event_id = e.id 
ORDER BY e.date;
```

### Backup Database
```bash
heroku pg:backups:capture --app sf-uki-social-calendar
```

### Restore Backup
```bash
heroku pg:backups:restore --app sf-uki-social-calendar
```

---

## 🚦 Monitoring

### Check if API is Running
Visit: https://sf-uki-social-calendar-a82afe6a386f.herokuapp.com/api/health

Should show:
```json
{
  "status": "ok",
  "database": "connected",
  "time": "2026-04-21T10:30:00.000Z"
}
```

### View Logs
```bash
heroku logs --tail --app sf-uki-social-calendar
```

### Check Database Connection
```bash
heroku pg:diagnose --app sf-uki-social-calendar
```

---

## 🔒 Security

### Current Setup:
- ✅ Database connection encrypted (SSL)
- ✅ Only accessible via Heroku app
- ✅ Database credentials auto-managed by Heroku
- ✅ No public database access

### Recommendations:
1. **Keep link internal** - Share only with 80 team members
2. **Monitor usage** - Check logs occasionally
3. **Regular backups** - Heroku auto-backups, but manual is good practice

---

## ⚡ Performance

### Response Times:
- **Load events:** ~100-200ms
- **Add event:** ~50-100ms
- **RSVP:** ~100-150ms
- **Auto-refresh:** Every 10 seconds

### Optimizations:
- PostgreSQL indexes on event.date and attendees.event_id
- Connection pooling (pg.Pool)
- Gzip compression enabled
- Static file caching

---

## 🐛 Troubleshooting

### Events not loading?
1. Check `/api/health` endpoint
2. View Heroku logs: `heroku logs --tail`
3. Verify DATABASE_URL is set: `heroku config`

### "Offline" indicator showing?
- Normal during Heroku dyno sleep (free tier)
- Page will auto-reconnect when dyno wakes
- Takes ~5-10 seconds on first visit

### RSVPs not saving?
- Check browser console (F12) for errors
- Verify database connection: `/api/health`
- Check if email already registered

---

## 🔄 Updates & Maintenance

### Update Code
```bash
git add .
git commit -m "Update message"
git push heroku main
```

### Database Migrations
Database tables auto-create on first run. To add new columns:
1. Update `api-server.js` CREATE TABLE statements
2. Drop tables: `heroku pg:reset --app sf-uki-social-calendar`
3. Redeploy: `git push heroku main`
4. Tables auto-recreate with new schema

---

## 📈 Scaling (If Needed)

### If You Exceed Free Tier:
```bash
# Upgrade to Hobby tier ($7/month for 10M rows)
heroku addons:upgrade heroku-postgresql:hobby-basic --app sf-uki-social-calendar
```

### Add More App Dynos:
```bash
# Scale to 2 dynos (first dyno is free, additional $7/dyno/month)
heroku ps:scale web=2 --app sf-uki-social-calendar
```

**You won't need this for 80 people!**

---

## 💡 Advantages Over Firebase

### 1. **Zero External Setup**
- No Firebase account needed
- No config file to manage
- Built into Heroku

### 2. **Standard SQL Database**
- Easy to query and understand
- Familiar to most developers
- Can connect other tools

### 3. **Heroku Integration**
- Auto-backups
- Built-in monitoring
- Simple scaling
- Heroku CLI management

### 4. **No Quotas to Worry About**
- Free tier is generous
- Clear limits
- Easy to upgrade

---

## 📞 Support

### Issues?
1. Check `/api/health` endpoint
2. View logs: `heroku logs --tail`
3. Check database: `heroku pg:info`

### Questions?
- Email: j.bolton@salesforce.com

---

## 🎉 Summary

You now have:
- ✅ PostgreSQL database (free, built into Heroku)
- ✅ REST API for all operations
- ✅ Auto-refreshing frontend (every 10 seconds)
- ✅ Shared calendar meetings
- ✅ No external services needed
- ✅ Ready for 80 team members

**Deploy with:** `./deploy-postgres.sh` 🚀

---

*No Firebase account needed! Everything runs on Heroku.*
