# 📝 Notes App

A simple notes app with user authentication.

**Stack:** React, Fastify, SQLite3

## Preview

![Notes App Preview](./preview.png)

## Getting Started

1. Install dependencies:

  ```bash
  # Frontend dependencies
  npm install

  # Backend dependencies
  cd api
  npm install
  ```

2. Run the app:
  ```bash
   # Backend (/api)
  cd api
  npm run dev

  # Frontend (/)
  npm run dev
  ```

App runs at `http://localhost:5173`, API at `http://localhost:3000`.

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/notes` | Get all notes |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |