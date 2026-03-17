# Legal Adversarial Reasoning Demo

A minimal full-stack demo where users enter a legal debate topic, choose a mode, and view AI-generated pro/con arguments (plus optional judge reasoning).

## Project structure

- `pages/` – Next.js pages
- `components/` – reusable React components
- `utils/` – frontend API helper
- `backend/` – Express server and OpenAI integration

## Prerequisites

- Node.js 18+
- npm
- OpenAI API key

## Setup

### 1) Install frontend dependencies

```bash
npm install
```

### 2) Install backend dependencies

```bash
cd backend
npm install
cd ..
```

### 3) Configure environment variables

Create `.env.local` in the repository root:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

Create `backend/.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
PORT=4000
```

## Run the demo

Terminal 1 (backend):

```bash
cd backend
npm run dev
```

Terminal 2 (frontend):

```bash
npm run dev
```

Then open `http://localhost:3000/debate/create`.

## API

### `POST /api/debate/create`

Request body:

```json
{ "topic": "Case facts or debate topic", "mode": "aiOpponent" }
```

Modes:
- `aiOpponent`
- `aiJudge`

Response:

```json
{ "pro": "...", "con": "...", "judge": "optional..." }
```

## Notes

- Data is stored in in-memory server storage for demo purposes (no database).
- Input is validated on both frontend and backend.
