# Globe Exam Frontend

## App Routes & Pages

This is the React single-page application (SPA) for the Globe Exam App. It provides user authentication, product browsing, cart management, and real-time promotions via WebSocket.

The app is a single-page application (SPA) with the following main routes:

- `/login` — Login page for user authentication
- `/signup` — User registration page
- `/dashboard` — Main dashboard after login, includes:
  - Product list (browse and add to cart)
  - Cart (view and remove items)
  - Change password dialog
  - Real-time promotions snackbar

All other routes redirect to `/login` if the user is not authenticated.

---

## Features

- Modern React (function components, hooks, context)
- Material UI for styling
- JWT authentication via cookies (no Authorization header)
- Real-time promotions using WebSocket (notistack for notifications)
- Modular, maintainable codebase
- Unit tests for main components (React Testing Library + Jest)

---

## Development

### Prerequisites

- Node.js and npm (for local dev outside Docker)

### Scripts

- `npm start` — Start the app in development mode (proxy to backend if needed)
- `npm test` — Run unit tests
- `npm run build` — Build for production (output in `build/`)

### Environment Variables

- `REACT_APP_API_URL` — Backend API base URL (set by Docker/nginx in production)

---

## Production

- Built with `npm run build` and served by nginx (see Dockerfile and nginx.conf)
- All API/WebSocket URLs are configured via environment variables for flexibility

---

## Testing

- Unit tests are in `src/components/__tests__/`
- Run with `npm test`

---

## Authentication

- Uses JWT stored in cookies (no localStorage, no Authorization header)
- All API requests use `credentials: 'include'`

---

## More

- See the root `README.md` for full-stack setup and usage instructions.
