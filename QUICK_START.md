# 🚀 Quick Start Guide - Shared Social Calendar

Get your calendar running with shared data in **10 minutes**!

## 📋 What You're Getting

✅ **Shared Calendar** - All 80 team members see the same events  
✅ **Real-time Sync** - Changes appear instantly for everyone  
✅ **Shared Meetings** - One calendar invite includes ALL attendees  
✅ **RSVP Tracking** - See who's coming to each event  
✅ **Free Forever** - Firebase free tier covers your team  

---

## 🎯 3-Step Setup

### Step 1: Create Firebase Project (5 min)

1. Go to: https://console.firebase.google.com/
2. Click **"Add project"** → Name it `sf-uki-social-calendar`
3. Click **"Realtime Database"** → **"Create Database"**
4. Choose **Europe (europe-west1)** region
5. Select **"Test mode"** → Click **"Enable"**

### Step 2: Get Your Firebase Config (2 min)

1. Click **⚙️ (Settings)** → **"Project settings"**
2. Scroll to **"Your apps"** → Click **`</>`** (Web)
3. App nickname: `Social Calendar` → **"Register app"**
4. **Copy the entire `firebaseConfig` object**

It looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 3: Update & Deploy (3 min)

1. Open `calendar-shared.html` in a text editor
2. Find line **~260** (search for `YOUR_API_KEY_HERE`)
3. Replace the placeholder `firebaseConfig` with your real config
4. Save the file

**Deploy to Heroku:**
```bash
./deploy-to-heroku.sh
```

**OR Deploy to GitHub Pages:**
```bash
./deploy-to-github.sh
```

---

## 🎉 You're Done!

Your calendar is now live with:
- ✅ Shared data across all team members
- ✅ Real-time updates
- ✅ Shared calendar invites with all RSVPs

### 🔗 Share Your Calendar

**Heroku:** https://sf-uki-social-calendar-a82afe6a386f.herokuapp.com/  
**GitHub:** https://jbolton123.github.io/sf-new/

---

## 🧪 Test It Works

1. Open your calendar in **two different browsers**
2. Add an event in one → See it appear in the other instantly
3. RSVP with different names in each browser
4. Check the attendee list updates in real-time
5. Click "Get Calendar Invite" → Verify all attendees are included

---

## 💡 How the Shared Meeting Works

When someone RSVPs:
1. Their name and email are saved to Firebase
2. The calendar link is generated with **ALL current attendees**
3. Google Calendar receives the meeting with everyone's emails
4. Each person who RSVPs gets the **same shared meeting** with the full attendee list

**Example:**
- Alice RSVPs → Gets calendar link with just Alice
- Bob RSVPs → Gets calendar link with Alice + Bob  
- Claire RSVPs → Gets calendar link with Alice + Bob + Claire

Everyone ends up in the **same meeting** with the complete attendee list!

---

## 🔒 Security Notes

**Current setup (Test Mode):**
- Anyone with the link can view/edit
- Perfect for trusted team of 80
- Don't share link publicly

**To secure later:**
1. Firebase Console → Database → Rules
2. Add email domain restriction:
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

## 📱 Features

### For Everyone:
- 📅 View all team events
- 👥 See who's attending
- 🔔 RSVP to events
- 📆 Get Google Calendar invites
- ⚡ Real-time sync indicator

### For Organizers:
- ➕ Add new events
- ✏️ Edit existing events
- 🗑️ Delete events
- 👀 See all RSVPs
- 📊 Track attendance

---

## ❓ Troubleshooting

**"Loading events from cloud..." forever?**
→ Check Firebase config is correct (line ~260 in calendar-shared.html)

**Changes not syncing?**
→ Check sync indicator (top right) - should be green "Synced"

**Can't add events?**
→ Check Firebase Database Rules allow write access

**Need help?**
→ See detailed guide: `FIREBASE_SETUP.md`

---

## 📞 Support

Contact: j.bolton@salesforce.com

---

**Ready to go? Start with Step 1 above!** 🚀
