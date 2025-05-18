# Globe Exam Backend

A Flask-based REST API and websocket backend for the Globe Exam App. Handles user authentication, product management, cart operations, and real-time promotion broadcasts.

## Technologies / Packages Used

- Python 3.10
- Flask
- Flask-SocketIO
- Flask-JWT-Extended
- Flask-CORS
- SQLAlchemy
- PyMySQL
- Gunicorn (production server, gevent worker)
- gevent (async worker for Gunicorn)
- Faker (for fake promotions)

## API Overview

### Blueprints

#### `/products` (src/blueprints/products.py)

- `GET /products` — List all products
- `GET /products/<id>` — Get product details by ID

#### `/auth` (src/blueprints/users_auth.py)

- `POST /auth/login` — User login (sets JWT cookies, returns tokens in body for compatibility)
- `POST /auth/signup` — User registration
- `POST /auth/logout` — User logout (clears JWT cookies)
- `POST /auth/refresh` — Refresh JWT token (cookie-based)
- `POST /auth/change-password` — Change user password
- `GET /auth/check` — Check authentication status

#### `/cart` (src/blueprints/cart.py)

- `GET /cart/get/<user_id>` — Get user's cart (JWT required)
- `POST /cart/add` — Add product to cart (JWT required)
- `POST /cart/remove` — Remove product from cart (JWT required)

#### `/promotions` (src/websocket/promotions.py)

- WebSocket channel for real-time promotion messages (authenticated users only)

## Other Features

- JWT authentication with token revocation (blocklist)
- All JWTs are stored in cookies only (no Authorization header)
- CORS configured for secure cross-origin requests with credentials
- No database seeding or table creation at app startup (handled by SQL in `db/init.sql`)
- Production-ready: Gunicorn with gevent worker, Flask-SocketIO async, Dockerized

## Development & Deployment Notes

- **Database schema and seed data** are managed via `db/init.sql` (run automatically by MySQL container)
- **No Python-based seeding** runs at app startup
- **WebSocket promotions** require authentication (JWT cookie)

---

See the root `README.md` for full-stack setup and usage instructions.
