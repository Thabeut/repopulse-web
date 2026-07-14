# RepoPulse Web

Dashboard for RepoPulse. Sign in with Google, search GitHub via our API, save repos, and chart stars / languages / commits.

**Live app:** https://web-thabet-kh.vercel.app  
**API:** https://repopulse-api.onrender.com/api/v1  
**API repo:** https://github.com/Thabeut/repopulse-api

## Setup

Requires Node 20+.

```bash
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173

`.env` needs:

```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
```

Get the Firebase values from Firebase Console → Project settings → Your apps (Web).  
Enable **Google** under Authentication → Sign-in method.  
Add `localhost` (and your Vercel host) under Authorized domains.

Point `VITE_API_BASE_URL` at a running API (local or https://repopulse-api.onrender.com/api/v1).

## Using the app

| Route | |
|-------|--|
| `/login` | Google sign-in |
| `/app` | Overview |
| `/app/search` | Search GitHub and save |
| `/app/repos` | Your library |
| `/app/repos/:owner/:name` | Detail + charts |

## Deploy

Hosted on **Vercel** from this repo. Production uses the same `VITE_*` vars as above, with `VITE_API_BASE_URL` set to the Render API.

## Stack

React · Vite · Tailwind · TanStack Query · Recharts · Firebase Auth
