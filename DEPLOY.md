# SmartGrow PWA — GitHub Pages Deployment Guide

## What's Inside This Folder

```
smartgrow-pwa/
├── index.html        ← Your app (with all scheduler fixes + PWA tags)
├── manifest.json     ← Tells browsers this is an installable app
├── sw.js             ← Service worker (caches app for offline loading)
├── icons/
│   ├── icon-192.png  ← App icon (home screen)
│   └── icon-512.png  ← App icon (splash screen)
└── DEPLOY.md         ← This file
```

---

## Step-by-Step: Deploy to GitHub Pages

### Step 1 — Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `smartgrow` (or whatever you like)
3. Keep it **Public** (required for free GitHub Pages)
4. Click **Create repository**

### Step 2 — Upload All Files

**Option A — GitHub Web Upload (easiest):**

1. On your new repo page, click **"uploading an existing file"**
2. Drag and drop ALL files from the `smartgrow-pwa` folder:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icons/icon-192.png`
   - `icons/icon-512.png`
3. Click **Commit changes**

**Option B — Git Command Line:**

```bash
cd smartgrow-pwa
git init
git add .
git commit -m "SmartGrow PWA v1.3"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smartgrow.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings** tab
2. Scroll to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Branch: **main**, Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes

### Step 4 — Your App is Live!

Your app URL will be:

```
https://YOUR_USERNAME.github.io/smartgrow/
```

---

## How to Install on Phones

### Android (Chrome):

1. Open the URL in Chrome
2. You'll see a banner: **"Add SmartGrow to Home screen"**
3. Tap it → Tap **Install**
4. App icon appears on home screen
5. Opens fullscreen — no browser bar!

### iPhone/iPad (Safari):

1. Open the URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share button** (square with arrow)
3. Scroll down → tap **"Add to Home Screen"**
4. Tap **Add**
5. App icon appears on home screen
6. Opens fullscreen — looks like a native app!

### Desktop (Chrome/Edge):

1. Open the URL
2. Click the **install icon** in the address bar (or ⋮ menu → Install)
3. Opens as a standalone window

---

## How to Update the App

1. Edit `index.html` on GitHub (or push new code)
2. In `sw.js`, change the version: `'smartgrow-v1.3'` → `'smartgrow-v1.4'`
3. Commit and push
4. GitHub Pages updates automatically in ~1 minute
5. Users get the new version next time they open the app

---

## Troubleshooting

**App not installing on phone?**
- Make sure you're using HTTPS (GitHub Pages does this automatically)
- On iOS, you MUST use Safari (Chrome on iOS doesn't support PWA install)
- Clear browser cache and try again

**MQTT not connecting?**
- The app needs internet to connect to your MQTT broker
- The ESP32 schedules run independently even without the app

**Icons not showing?**
- Make sure the `icons/` folder was uploaded with both PNG files
- Check that paths in manifest.json match your file structure

---

## Your URLs

After deployment, share these with anyone:

- **Web App:** `https://YOUR_USERNAME.github.io/smartgrow/`
- **Install:** Same link — users tap "Add to Home Screen"

That's it. One link works everywhere — Android, iOS, Desktop.
