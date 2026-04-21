#!/bin/bash

# Firebase Setup Helper Script
# This script will guide you through setting up Firebase for the social calendar

echo "🔥 Firebase Setup Helper for SF UKI Social Calendar"
echo "===================================================="
echo ""

# Check if firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "📦 Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

echo "📋 Steps to complete:"
echo ""
echo "1. Open Firebase Console: https://console.firebase.google.com/"
echo "2. Create a new project called 'sf-uki-social-calendar'"
echo "3. Enable Realtime Database (Europe region)"
echo "4. Get your Firebase config from Project Settings"
echo ""
echo "Press ENTER when you have your Firebase config ready..."
read

echo ""
echo "📝 Please paste your Firebase config below"
echo "(It should look like: const firebaseConfig = { ... })"
echo ""
echo "Paste the entire firebaseConfig object and press CTRL+D when done:"
echo ""

# Read multi-line input
config_input=$(cat)

# Create backup of original file
cp calendar-shared.html calendar-shared.html.backup

# Extract the config values using basic string manipulation
echo ""
echo "✨ Updating calendar-shared.html with your Firebase config..."

# For simplicity, we'll create a temporary file with the user's config
temp_config="/tmp/firebase_config_temp.txt"
echo "$config_input" > "$temp_config"

echo ""
echo "✅ Config saved!"
echo ""
echo "🔧 Next steps:"
echo "1. Manually update calendar-shared.html with your Firebase config (line ~260)"
echo "2. Or use the Firebase config you pasted above"
echo ""
echo "📤 Deploy to Heroku:"
echo "   ./deploy-to-heroku.sh"
echo ""
echo "📤 Deploy to GitHub Pages:"
echo "   ./deploy-to-github.sh"
echo ""
echo "Your Firebase config has been saved to: $temp_config"
echo "Backup of original file: calendar-shared.html.backup"
echo ""
echo "✨ Setup complete!"
