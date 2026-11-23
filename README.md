# Pinspire

Pinspire is a visual discovery and bookmarking demo. Its feed, saves, autocomplete, and following features demonstrate a heap, linked lists, a trie, and a graph.

The implementations are in `frontend/data-structures/`.

## Requirements

- Python 3
- Node.js and npm (for the backend)
- MongoDB running locally, or a MongoDB connection URI

## Run the frontend

Open a terminal in the project folder and run:

```powershell
python -m http.server 8000
```

Open [http://localhost:8000/frontend/](http://localhost:8000/frontend/) in your browser.

## Run the backend

Open a second terminal in the project folder:

```powershell
cd backend
npm install
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

Edit `backend/.env` and set `MONGODB_URI` to your MongoDB connection string. Then start the backend:

```powershell
npm run dev
```

The backend starts on port `5000` by default. Use `npm start` instead of `npm run dev` to start it without the development watcher.

## Note

The frontend currently stores accounts and activity in browser local storage; it does not yet call the backend API. The backend currently connects to MongoDB and provides a basic test route.
