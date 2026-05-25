# ⚡ DSA Lens — Pattern Trainer

Train your DSA pattern recognition by mapping real-world scenarios to data structures & algorithms.

Built for CS students preparing for coding interviews.

---

## 🚀 Deploy to Vercel (5 minutes)

### Step 1 — Push to GitHub
1. Create a new repo on github.com
2. Run these commands in this folder:
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dsa-lens.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `dsa-lens` repository
4. Click **Deploy** (Vercel auto-detects Vite)

### Step 3 — Add your API Key
1. In Vercel dashboard → your project → **Settings → Environment Variables**
2. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your key from [console.anthropic.com](https://console.anthropic.com)
3. Click **Save** then go to **Deployments → Redeploy**

✅ Done! Share the link with your friends.

---

## 💻 Local Development

```bash
npm install
cp .env.example .env.local
# Add your API key to .env.local
npm run dev
```

---

## 📁 Project Structure

```
dsa-lens/
├── api/
│   └── analyze.js        # Secure serverless function (API key lives here)
├── src/
│   ├── main.jsx          # React entry point
│   └── App.jsx           # Main app
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## Features
- 🎯 8 real-world DSA scenarios with 2-min timer
- 🤖 AI Analyzer — paste any problem, get pattern breakdown
- 💡 Hint system
- 📊 Score tracking per session
- 🔒 API key secured server-side (never exposed to browser)
