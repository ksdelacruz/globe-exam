# app.py
from flask import Flask, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from datetime import timedelta

from models import db
from models.User import User

from src.blueprints.products import products_bp
from src.blueprints.users_auth import auth_bp, token_blocklist
from src.blueprints.cart import cart_bp


app = Flask(__name__)
CORS(app, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")


# --- Configs with CLI/env support ---
import argparse
import os

parser = argparse.ArgumentParser(description='Run Flask app with environment.')
parser.add_argument('--env', choices=['production', 'development'], default=os.environ.get('FLASK_ENV', 'production'))
parser.add_argument('--dbhost', default=os.environ.get('DB_HOST', 'localhost'))
args, unknown = parser.parse_known_args()

db_host = args.dbhost
flask_env = args.env

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://root:root@{db_host}:3306/users_db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
app.config['JWT_REFRESH_COOKIE_PATH'] = '/token/refresh'
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

# Init DB & JWT
db.init_app(app)
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(products_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(cart_bp)

# Register websocket namespace and start broadcast
from src.websocket.promotions import PromotionsNamespace, start_promotions_broadcast
socketio.on_namespace(PromotionsNamespace('/promotions'))
start_promotions_broadcast(socketio, app)

# JWT revocation logic
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    return jwt_payload['jti'] in token_blocklist

# Protected test route
@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    user = User.query.get(get_jwt_identity())
    return jsonify({"username": user.username, "email": user.email, "id": user.id, "last_login": user.last_login})

@app.route('/hello-world', methods=['GET'])
def hello_world():
    return jsonify({"msg": "Hello, World!"})




if __name__ == '__main__':
    debug_mode = flask_env == 'development'
    socketio.run(app, host='0.0.0.0', port=5000, debug=debug_mode)