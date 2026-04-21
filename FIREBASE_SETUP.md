# 🔥 Firebase Setup Guide for Shared Social Calendar

This guide will help you set up Firebase Realtime Database so all 80 team members can see the same events and RSVPs.

## ✨ What You'll Get

- ✅ **Shared data** - All 80 people see the same events
- ✅ **Real-time sync** - Changes appear instantly for everyone
- ✅ **Single shared meeting** - When someone RSVPs, they're added to one calendar event with ALL attendees
- ✅ **Free tier** - Firebase is free for your team size

---

## 🚀 Setup Steps (10 minutes)

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `sf-uki-social-calendar`
4. Disable Google Analytics (optional, simpler setup)
5. Click **"Create project"**

### Step 2: Enable Realtime Database

1. In Firebase Console, click **"Realtime Database"** in left sidebar
2. Click **"Create Database"**
3. **Location**: Choose **Europe (europe-west1)** for GDPR compliance
4. **Security rules**: Start in **test mode** (we'll secure it after)
5. Click **"Enable"**

### Step 3: Get Firebase Config

1. In Firebase Console, click the **gear icon** (⚙️) → **"Project settings"**
2. Scroll down to **"Your apps"**
3. Click the **`</>`** button (Web platform)
4. App nickname: `Social Calendar`
5. Click **"Register app"**
6. Copy the `firebaseConfig` object (looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "sf-uki-social-calendar.firebaseapp.com",
  databaseURL: "https://sf-uki-social-calendar-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sf-uki-social-calendar",
  storageBucket: "sf-uki-social-calendar.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 4: Update the Calendar File

1. Open `calendar-shared.html`
2. Find line ~260 (the `firebaseConfig` section)
3. Replace the placeholder config with your actual Firebase config
4. Save the file

### Step 5: Secure Your Database

**IMPORTANT:** After testing, secure your database so only your team can access it.

1. Go to **Realtime Database** → **Rules** tab
2. Replace the rules with:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**For production with authentication** (recommended):
```json
{
  "rules": {
    "events": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

3. Click **"Publish"**

---

## 📋 Deploy Updated Calendar

### Option A: Deploy to Heroku

```bash
# Replace index.php to serve the new shared calendar
cd /Users/j.bolton/Documents/Claude-Project

# Update index.php
echo '<?php include_once("calendar-shared.html"); ?>' > index.php

# Commit and deploy
git add calendar-shared.html index.php FIREBASE_SETUP.md
git commit -m "Add Firebase-powered shared calendar with team RSVPs"
git push heroku main
```

### Option B: Deploy to GitHub Pages

```bash
# Copy shared calendar as main index
cp calendar-shared.html index.html

# Commit and push
git add index.html calendar-shared.html FIREBASE_SETUP.md
git commit -m "Add Firebase-powered shared calendar with team RSVPs"
git push origin main
```

---

## 🎯 Features Explained

### 1. **Shared Data**
- All events stored in Firebase cloud database
- Everyone sees the same calendar
- Changes sync in real-time

### 2. **Shared Calendar Meeting**
When someone RSVPs:
- Their name and email are added to the attendee list
- The Google Calendar link includes **ALL attendees**
- Everyone who RSVPs sees the complete attendee list
- One shared meeting, not individual invites

### 3. **Real-time Sync Indicator**
- **Green "Synced"** = Connected to Firebase
- **Yellow "Syncing"** = Saving changes
- **Red "Offline"** = No internet connection

---

## 🔒 Security Considerations

### Current Setup (Test Mode)
- ✅ Anyone with the link can view/edit
- ✅ Good for trusted team of 80
- ⚠️ Link should not be shared publicly

### Recommended for Production
1. **Add Firebase Authentication**
   - Salesforce SSO integration
   - Only authenticated users can write
   - Public read access for events

2. **Email Domain Restriction**
   ```json
   {
     "rules": {
       "events": {
         ".read": true,
         ".write": "auth.token.email.matches(/.*@salesforce\\.com$/)"
       }
     }
   }
   ```

---

## 📊 Firebase Pricing

**Spark Plan (Free)**
- ✅ 1GB storage
- ✅ 10GB/month bandwidth
- ✅ 100 simultaneous connections
- ✅ Perfect for 80 people

Your usage estimate:
- Events data: ~10KB
- 80 users: ~5 connections at a time
- Well within free tier limits

---

## 🧪 Testing

1. Open the calendar in two different browsers
2. Add an event in one browser
3. See it appear instantly in the other
4. RSVP to an event
5. Check the Google Calendar link includes all attendees

---

## ❓ Troubleshooting

### Events not showing?
- Check browser console (F12) for errors
- Verify Firebase config is correct
- Ensure database rules allow read access

### Can't save events?
- Check database rules allow write access
- Verify you're online (check sync indicator)

### Real-time updates not working?
- Refresh the page
- Check internet connection
- Verify databaseURL in config is correct

---

## 📞 Support

For issues:
1. Check browser console (F12) for error messages
2. Verify Firebase credentials are correct
3. Test with Firebase Console to ensure database is accessible

---

**Next Step:** Follow Step 1 above to create your Firebase project! 🚀
