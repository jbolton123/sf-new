# 🎉 Salesforce UKI Social Calendar 2026

A collaborative team calendar for the Salesforce UKI Marketing Cloud team (80 people).

## Features

- 📅 Add, edit, and delete team events
- 👥 RSVP tracking with attendee lists
- 📆 Google Calendar integration (auto-generate calendar invites)
- 💾 LocalStorage persistence (data stays in browser)
- 📱 Fully responsive design
- 🎨 Salesforce branded UI

## Live Deployment

**GitHub Pages**: https://jbolton123.github.io/sf-new/calendar.html  
**Heroku**: Coming soon...

## Local Development

1. Open `calendar.html` in any browser
2. Or run a local server:
   ```bash
   npm install
   npm start
   ```
   Visit: http://localhost:3000

## Heroku Deployment

### Quick Deploy
```bash
# Create Heroku app (EU region for GDPR compliance)
heroku create sf-uki-social-calendar --region eu

# Deploy
git push heroku main

# Open the app
heroku open
```

### Manual Setup
1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login: `heroku login`
3. Create app: `heroku create your-app-name --region eu`
4. Add remote: `heroku git:remote -a your-app-name`
5. Deploy: `git push heroku main`

### Buildpack Info
This app uses **PHP buildpack** for simplicity. The `index.php` file serves the static HTML.

Alternatively, you can use **Node.js buildpack** - both `package.json` and `Procfile` are included.

## Tech Stack

- Pure HTML/CSS/JavaScript (no frameworks)
- LocalStorage for data persistence
- Google Calendar API integration
- Express.js for Heroku hosting (optional)
- PHP for static file serving (alternative)

## Data Storage

⚠️ **Important**: This version uses browser localStorage, meaning:
- Data is stored locally in each user's browser
- Not shared between users
- Persists across sessions on the same device

To enable **shared data** across all 80 team members, you would need to:
1. Set up a real Firebase database (currently has placeholder config)
2. Or add a backend API (Node.js/Express + PostgreSQL)

## Security Notes

- No authentication required (team-internal tool)
- LocalStorage data is browser-specific
- For production use with 80 people, consider adding:
  - Salesforce SSO integration
  - Shared database (Firebase/PostgreSQL)
  - Data backup strategy

## Browser Support

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

## Support

For issues or questions, contact: j.bolton@salesforce.com

---

Built with ❤️ for the Salesforce UKI Marketing Cloud Team
