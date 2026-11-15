# ethanfrakes.com

Personal website — a Create React App single-page app, self-hosted.

```
visitor ──HTTPS──> Cloudflare edge ──tunnel (outbound from server)──> cloudflared ──> web (nginx :8080)
```

| Service       | Container                 | What it does                                                   |
|---------------|---------------------------|----------------------------------------------------------------|
| `web`         | `ethanfrakes-web`         | Multi-stage build: `npm run build`, then unprivileged nginx serves `build/` |
| `cloudflared` | `ethanfrakes-cloudflared` | Tunnel connector for `ethanfrakes.com` + `www.ethanfrakes.com` |

The `web` port is bound to `127.0.0.1:8090` only, for debugging on the server;
it is not reachable from the LAN. `www` is 301-redirected to the apex by nginx.

## Deploy / update on the server

```bash
git clone https://github.com/thefrostedfrakes/ethanfrakes-site.git personal-website
cd personal-website
cp .env.example .env          # paste CLOUDFLARE_TUNNEL_TOKEN
docker compose up -d --build
```

To publish changes: `git pull && docker compose up -d --build`. Only the `web`
image rebuilds; the tunnel stays up.

Checks on the server:

```bash
docker compose ps                         # both services Up, web (healthy)
curl -s http://localhost:8090/healthz     # ok
docker compose logs -f cloudflared        # "Registered tunnel connection" x4
```

## Cloudflare setup (one time)

1. **Zero Trust → Networks → Tunnels → Create a tunnel** (Cloudflared), name it
   `ethanfrakes`, copy the token into `.env`.
2. In **DNS → Records**, delete the four GitHub Pages `A` records on
   `ethanfrakes.com` and the `www` CNAME to `thefrostedfrakes.github.io`.
3. Back in the tunnel, **Public Hostnames → Add**:
   - `ethanfrakes.com` → `HTTP` → `web:8080`
   - `www.ethanfrakes.com` → `HTTP` → `web:8080`

   Cloudflare creates the proxied `CNAME → <tunnel-id>.cfargotunnel.com`
   records itself.
4. Disable GitHub Pages in the repo settings once the site loads from the server.

## Local development

```bash
npm install
npm start        # http://localhost:3000, hot reload
npm run build    # production bundle in build/
```
