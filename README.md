# RepoPulse Web

React dashboard for RepoPulse. Talks only to the RepoPulse API (not GitHub directly).

## Stack

React · TypeScript · Vite · Tailwind · TanStack Query · Recharts · Firebase Auth

## Deploy

**Vercel** — import this repo:

- Framework: Vite
- Build: `npm run build`
- Output: `dist`
- Env: copy from `.env.example` (`VITE_API_BASE_URL` = your Render API URL + `/api/v1`)

`vercel.json` handles SPA rewrites.

## Local

```bash
cp .env.example .env
npm install
npm run dev
```

http://localhost:5173

Point `VITE_API_BASE_URL` at the API (local or Render).

### Firebase web config

1. Firebase Console → Authentication → enable **Google** provider  
2. Project settings → add a **Web** app → copy config into `web/.env` (`VITE_FIREBASE_*`)  
3. Authorized domains include `localhost`  
4. `npm run dev` → open `/login` → Continue with Google → `/app` should show `/auth/me` payload  

## Docker (optional)

```bash
docker build \
  --build-arg VITE_API_BASE_URL=https://your-api.onrender.com/api/v1 \
  -t repopulse-web .
docker run -p 8080:80 repopulse-web
```

## License

MIT
