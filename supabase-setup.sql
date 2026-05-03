# HireSouth - Recruitment Platform

A full-stack recruitment management platform with AI-powered resume parsing, candidate profile generation, and intelligent job matching.

## Architecture

**Frontend**: Static HTML/JavaScript (hosted on Vercel or any CDN)
**Backend**: Node.js/Express (hosted on Vercel)
**Database**: Supabase (PostgreSQL in the cloud)
**AI**: Anthropic Claude API

## Quick Start

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local`:
   ```bash
   cp .env.local.example .env.local
   # Edit with your actual keys
   ```

3. Set up Supabase tables:
   - Go to Supabase SQL Editor
   - Run contents of `supabase-setup.sql`

4. Start backend:
   ```bash
   npm run dev
   ```
   Backend runs on `http://localhost:3000`

5. Open the frontend HTML in your browser

### Deployment to Vercel

See `DEPLOYMENT.md` for complete step-by-step instructions.

## Features

- **Resume Upload & Parsing** — Upload PDF/Word resumes, AI extracts candidate data
- **Profile Generation** — Auto-generate branded HS profiles with interview highlights
- **AI Candidate Screening** — Score candidates against job requirements
- **Pipeline Management** — Kanban board (Sourced → Profiled → Sent → Placed)
- **Open Roles Tracker** — Manage active roles and pipeline status
- **JD Library** — Save job descriptions for AI screening
- **Team Profiles** — Support multiple team members (CEO, SMO, Recruiter)
- **Settings** — Store API keys and company info

## API Endpoints

### AI Features
- `POST /api/parse-resume` — Extract candidate data from resume
- `POST /api/generate-profile` — Generate HS profile for candidate
- `POST /api/screen-candidate` — Score candidate against job

### CRUD Operations
- `GET /api/candidates` — List all candidates
- `POST /api/candidates` — Create candidate
- `PUT /api/candidates/:id` — Update candidate
- `DELETE /api/candidates/:id` — Delete candidate

Similar endpoints for `/api/roles` and `/api/jobs`

## Environment Variables

```
ANTHROPIC_API_KEY    # Your Anthropic API key (sk-ant-...)
SUPABASE_URL         # Your Supabase project URL
SUPABASE_ANON_KEY    # Your Supabase anon key
```

## Stack

- **Express.js** — REST API backend
- **Supabase** — PostgreSQL database + auth
- **Anthropic Claude** — AI for parsing, generation, screening
- **CORS** — Allow frontend requests
- **dotenv** — Environment variables

## License

MIT
