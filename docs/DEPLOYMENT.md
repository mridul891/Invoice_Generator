## Deployment Guide

This document describes how to deploy the client (React/Vite) and the server (Node/Express), along with optional CI/CD workflows.

### Prerequisites
- Node.js 18+
- MongoDB Atlas project (or any MongoDB instance)
- A hosting provider for:
  - Client (e.g., Vercel, Netlify, Cloudflare Pages, S3+CloudFront)
  - Server (e.g., Render, Railway, Heroku, VPS, or Docker on your infra)

### Environment Configuration

Backend `.env`:
```
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_api_key
```

Frontend `.env`:
```
VITE_API_BASE_URL=https://your-api.example.com
```

### Build Commands

Client:
```bash
cd client
npm ci
npm run build
# build artifacts in client/dist
```

Server:
```bash
cd backend
npm ci
npm run start
# or: npm run dev (nodemon) for development
```

### Example: Deploy Client to Vercel
1. Connect GitHub repo in Vercel
2. Framework preset: Vite
3. Build command: `npm run build` (in `client`)
4. Output directory: `client/dist`
5. Add environment variable: `VITE_API_BASE_URL`
6. Set project root to `client` in Vercel settings (or add a monorepo configuration)

### Example: Deploy Client to Netlify
- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `client/dist`
- Environment: `VITE_API_BASE_URL`

### Example: Deploy Server to Render
1. Create a new Web Service from repo
2. Root directory: `backend`
3. Build command: `npm ci`
4. Start command: `npm start`
5. Add environment variables: `PORT`, `MONGODB_URI`, `JWT_SECRET`, `GOOGLE_API_KEY`
6. Health check path: `/`

### Example: Deploy Server with Docker
Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV NODE_ENV=production
EXPOSE 8000
CMD ["node", "index.js"]
```

Build & run:
```bash
docker build -t invoice-backend ./backend
docker run -p 8000:8000 --env-file ./backend/.env invoice-backend
```

### CI/CD with GitHub Actions

Add `.github/workflows/deploy.yml` (example multi-job):
```yaml
name: CI/CD

on:
  push:
    branches: [ main ]

jobs:
  client-build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: client
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - name: Upload dist artifact
        uses: actions/upload-artifact@v4
        with:
          name: client-dist
          path: client/dist

  server-deploy:
    runs-on: ubuntu-latest
    needs: client-build
    defaults:
      run:
        working-directory: backend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - name: Run tests
        run: npm test --if-present
      - name: Deploy to Render (example)
        run: echo "Use Render deploy CLI/API or provider-specific action here"
```

Notes:
- Replace provider-specific deployment steps with your platform’s official GitHub Action or CLI.
- For monorepos, configure your hosting provider’s project root appropriately.


