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

## Docker (optional)

```bash
docker build \
  --build-arg VITE_API_BASE_URL=https://your-api.onrender.com/api/v1 \
  -t repopulse-web .
docker run -p 8080:80 repopulse-web
```

## License

MIT
