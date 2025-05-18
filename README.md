# Globe Exam App

[![Watch the demo](https://img.youtube.com/vi/kDag-9gnji8/0.jpg)](https://youtu.be/kDag-9gnji8)

A full-stack e-commerce demo application featuring user authentication, product browsing, cart management, and real-time promotions. The app is built with a React frontend, Flask backend (with Flask-SocketIO for real-time features), and MySQL database, all orchestrated with Docker Compose for easy local development and production deployment.

---

## Features

- User authentication (JWT via cookies, secure, no Authorization header)
- Product browsing and search
- Cart management
- Real-time promotions via WebSocket (Flask-SocketIO + notistack)
- Robust modular codebase (frontend and backend)
- Production-ready Docker setup (nginx for frontend, Gunicorn+gevent for backend)
- Database schema and seed data managed via SQL (`db/init.sql`)
- Unit tests for main frontend components

---

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (includes Docker Compose)
- (Optional) Node.js and npm if you want to run the frontend outside Docker

---

## Running the App

1. **Clone this repository:**

   ```powershell
   git clone <your-repo-url>
   cd globe-exam
   ```

2. **Start all services (frontend, backend, db) with Docker Compose:**

   ```powershell
   docker-compose up --build
   ```

   - This will:
     - Build and start the backend (Flask + Gunicorn + gevent)
     - Build and start the frontend (React + nginx)
     - Start the MySQL database and initialize schema/data from `db/init.sql`

3. **Access the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)
   - MySQL: localhost:3306 (see `db/init.sql` for schema and seed data)

---

## Folder Structure

- `backend/` — Flask REST API and websocket server
- `frontend/` — React web application (SPA, served by nginx in production)
- `db/` — MySQL initialization scripts (schema and seed data)

---

## Development Notes

- **Database seeding and schema** are now handled entirely by `db/init.sql`. No Python-based seeding runs at app startup.
- **JWT authentication** uses cookies only. No Authorization header is sent from the frontend.
- **CORS** is configured for secure cross-origin requests with credentials.
- **WebSocket promotions** are available to authenticated users only.
- **Unit tests** for main frontend components are in `frontend/src/components/__tests__/`.

---

## Default Users

- `root` / `root`
- `user1` / `user1`

(See `db/init.sql` for details.)

---

## Useful Commands

- **Rebuild and restart everything:**
  ```powershell
  docker-compose down -v
  docker-compose up --build
  ```
- **Re-initialize the database only:**
  ```powershell
  # From the project root, assuming MySQL is running in Docker
  docker exec -i <mysql_container_name> mysql -u root -proot < db/init.sql
  ```

---

## More

- See `backend/README.md` and `frontend/README.md` for more details on each service.
