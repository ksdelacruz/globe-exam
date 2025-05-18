from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token, create_refresh_token, jwt_required,
    get_jwt_identity, get_jwt, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies
)
from werkzeug.security import generate_password_hash, check_password_hash

from models.User import User
from models import db

auth_bp = Blueprint('auth', __name__)
token_blocklist = set()

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "Username already exists"}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "Email already exists"}), 400
    user = User(
        username=data['username'],
        email=data['email'],
        password=generate_password_hash(data['password'])
    )
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))
    resp = jsonify({"msg": "Signup successful"})
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
    return resp, 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"msg": "Invalid credentials"}), 401
    # Update last_login
    from datetime import datetime
    user.last_login = datetime.utcnow()
    db.session.commit()
    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))
    resp = jsonify({
        "msg": "Login successful",
        "access_token": access_token,
        "refresh_token": refresh_token
    })
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
    return resp

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    token_blocklist.add(get_jwt()['jti'])
    resp = jsonify({"msg": "Logged out"})
    unset_jwt_cookies(resp)
    return resp

@auth_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    data = request.get_json()
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404
    old_password = data.get('old_password')
    new_password = data.get('new_password')
    if not old_password or not new_password:
        return jsonify({"msg": "Missing fields"}), 400
    if not check_password_hash(user.password, old_password):
        return jsonify({"msg": "Old password is incorrect"}), 400
    user.password = generate_password_hash(new_password)
    db.session.commit()
    return jsonify({"msg": "Password updated successfully"}), 200

@auth_bp.route('/token/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=str(identity))
    resp = jsonify({"msg": "Token refreshed"})
    set_access_cookies(resp, access_token)
    return resp

@auth_bp.route('/auth/check', methods=['GET'])
@jwt_required()
def check_auth():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        return jsonify({
            "logged_in": True,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }), 200
    return jsonify({"logged_in": False}), 404

@auth_bp.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify([
        {
            "id": user.id,
            "username": user.username,
            "email": user.email
        } for user in users
    ])
