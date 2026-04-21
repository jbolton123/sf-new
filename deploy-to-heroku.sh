#!/bin/bash

echo "🚀 Deploying Shared Calendar to Heroku"
echo "======================================="
echo ""

# Update index.php to serve shared calendar
echo '<?php include_once("calendar-shared.html"); ?>' > index.php

echo "✅ Updated index.php to serve shared calendar"
echo ""

# Add and commit changes
git add calendar-shared.html index.php FIREBASE_SETUP.md
git commit -m "Deploy Firebase-powered shared calendar with team RSVPs

- All 80 team members see same events
- Real-time sync via Firebase
- Shared calendar meetings with all attendees
- RSVP tracking across the team

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

echo ""
echo "📤 Pushing to Heroku..."
git push heroku main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your calendar is live at:"
echo "   https://sf-uki-social-calendar-a82afe6a386f.herokuapp.com/"
echo ""
echo "🔗 Share this link with your 80 team members!"
echo ""
