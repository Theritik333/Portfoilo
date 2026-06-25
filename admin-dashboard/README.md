# Portfolio Admin Dashboard

React + Zustand + Tailwind CSS — Admin panel for Prakhar Mavi's portfolio backend.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create env file
cp .env.example .env
# Edit .env and set your backend URL:
# VITE_API_URL=http://localhost:5000/api

# 3. Start dev server
npm run dev
# Opens at http://localhost:3000
```

## Pages

| Route | Page |
|-------|------|
| `/` | Dashboard — stats, recent messages, projects overview |
| `/projects` | Projects — CRUD (add/edit/delete), featured toggle |
| `/messages` | Messages — filter by status, mark read, reply, delete |
| `/profile` | Profile — edit name, tagline, about, principles |
| `/social` | Social Links — GitHub, LinkedIn, Discord CRUD |
| `/tech` | Tech Icons — homepage icon grid CRUD |

## Stack

- **React 18** + **React Router v6**
- **Zustand** — separate store per resource (auth, projects, messages, profile, social, tech)
- **Tailwind CSS v3** — utility-first styling
- **Axios** — API calls with JWT interceptor
- **Vite** — dev server + build tool
- **Plus Jakarta Sans** — Google Font

## Backend Required

This dashboard connects to the Express + MongoDB backend. Make sure it is running on port 5000 (or update VITE_API_URL in .env).

Login with the admin credentials you registered via POST /api/admin/register.
