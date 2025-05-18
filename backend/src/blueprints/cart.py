from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.orm import joinedload
from datetime import datetime, timezone

from models import db
from models.Cart import Cart
from models.Product import Product

cart_bp = Blueprint('cart', __name__, url_prefix='/cart')

@cart_bp.route('/add', methods=['POST'])
@jwt_required()
def add_to_cart():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    product_id = data.get('product_id')

    if not Product.query.get(product_id):
        return jsonify({"msg": "Product not found"}), 404

    new_item = Cart(user_id=user_id, product_id=product_id, checkout_date=datetime.now(timezone.utc))
    db.session.add(new_item)
    db.session.commit()

    product = Product.query.get(product_id)

    product_data = {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "category": product.category,
            "price": product.price,
            "checkout_date": new_item.checkout_date
        }

    return jsonify(product_data), 200

@cart_bp.route('/remove', methods=['POST'])
@jwt_required()
def remove_from_cart():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    product_id = data.get('product_id')

    item = Cart.query.filter_by(user_id=user_id, product_id=product_id).first()
    if not item:
        return jsonify({"msg": "Item not found in cart"}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({"msg": "Item removed from cart"}), 200


@cart_bp.route('/get/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_cart(user_id):
    current_user_id = int(get_jwt_identity())
    if current_user_id != user_id:
        return jsonify({"msg": "Unauthorized"}), 403

    cart_items = Cart.query.options(joinedload(Cart.product)).filter_by(user_id=user_id).all()

    products = [
        {
            "id": item.product.id,
            "name": item.product.name,
            "description": item.product.description,
            "category": item.product.category,
            "price": item.product.price,
            "checkout_date": item.checkout_date
        }
        for item in cart_items if item.product
    ]

    return jsonify(products), 200

