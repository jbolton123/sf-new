#!/bin/bash

echo "🚀 Deploying Shared Calendar to GitHub Pages"
echo "============================================="
echo ""

# Copy shared calendar as main index
cp calendar-shared.html index.html

echo "✅ Set calendar-shared.html as main page"
echo ""

# Add and commit changes
git add index.html calendar-shared.html FIREBASE_SETUP.md
git commit -m "Deploy Firebase-powered shared calendar to GitHub Pages

- All 80 team members see same events
- Real-time sync via Firebase
- Shared calendar meetings with all attendees
- RSVP tracking across the team

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

echo ""
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your calendar is live at:"
echo "   https://jbolton123.github.io/sf-new/"
echo ""
echo "⏳ GitHub Pages may take 1-2 minutes to update"
echo ""
echo "🔗 Share this link with your 80 team members!"
echo ""
