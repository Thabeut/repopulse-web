# RepoPulse Web

React dashboard for RepoPulse. Talks only to the RepoPulse API (not GitHub directly).

**Live:** https://web-thabet-kh.vercel.app  
**API:** https://repopulse-api.onrender.com/api/v1  
**Repo:** https://github.com/Thabeut/repopulse-web

Sign in with Google, then search / save GitHub repos, browse your library, and view stars / languages / commit charts.

## Stack

React · TypeScript · Vite · Tailwind · TanStack Query · Recharts · Firebase Auth · lucide-react

## Deploy (Vercel)

Project linked to GitHub `main`. Production env:

```bash
VITE_API_BASE_URL=https://repopulse-api.onrender.com/api/v1
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=repopulse-f10fe.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=repopulse-f10fe
VITE_FIREBASE_APP_ID=...
```

`vercel.json` handles SPA rewrites.

Firebase Console → Authentication → **Authorized domains** must include `web-thabet-kh.vercel.app`.

## Local

```bash
cp .env.example .env
npm install
npm run dev
```

http://localhost:5173

Point `VITE_API_BASE_URL` at local API (`http://localhost:3000/api/v1`) or production Render.

### Firebase web config

1. Enable **Google** sign-in in Firebase Authentication  
2. Add a **Web** app → copy config into `.env` (`VITE_FIREBASE_*`)  
3. Authorized domains include `localhost`  
4. Open `/login` → Continue with Google → `/app`

## Routes

| Path | Page |
|------|------|
| `/` | Landing |
| `/login` | Google sign-in |
| `/app` | Dashboard |
| `/app/search` | GitHub search + save |
| `/app/repos` | Saved library |
| `/app/repos/:owner/:name` | Detail + charts |

## Docker (optional)

```bash
docker build \
  --build-arg VITE_API_BASE_URL=https://repopulse-api.onrender.com/api/v1 \
  -t repopulse-web .
docker run -p 8080:80 repopulse-web
```

## License

MIT
