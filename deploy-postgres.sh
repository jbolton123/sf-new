#!/bin/bash

echo "🚀 Deploying Social Calendar with PostgreSQL Database"
echo "======================================================"
echo ""

# Check if PostgreSQL addon exists
echo "📊 Checking for PostgreSQL addon..."
heroku addons --app sf-uki-social-calendar | grep -q "heroku-postgresql"

if [ $? -ne 0 ]; then
    echo "📦 Adding PostgreSQL addon (free tier)..."
    heroku addons:create heroku-postgresql:essential-0 --app sf-uki-social-calendar
    echo "✅ PostgreSQL addon added"
    echo "⏳ Waiting for database to provision (30 seconds)..."
    sleep 30
else
    echo "✅ PostgreSQL addon already exists"
fi

echo ""
echo "📝 Committing changes..."

git add api-server.js calendar-db.html package.json Procfile
git commit -m "Switch to PostgreSQL backend for shared calendar

- Replace Firebase with Heroku PostgreSQL
- Full REST API with Express + PostgreSQL
- Real-time polling for updates
- Shared meeting invites with all attendees
- No external services needed

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

echo ""
echo "📤 Deploying to Heroku..."
git push heroku main

echo ""
echo "⏳ Waiting for deployment..."
sleep 5

echo ""
echo "🔍 Checking database connection..."
heroku run node -e "console.log('Database URL:', process.env.DATABASE_URL ? 'Set ✅' : 'Missing ❌')" --app sf-uki-social-calendar

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your calendar is live at:"
echo "   https://sf-uki-social-calendar-a82afe6a386f.herokuapp.com/"
echo ""
echo "🔗 Share this link with your 80 team members!"
echo ""
echo "📊 To view database:"
echo "   heroku pg:info --app sf-uki-social-calendar"
echo ""
echo "📝 To view logs:"
echo "   heroku logs --tail --app sf-uki-social-calendar"
echo ""
