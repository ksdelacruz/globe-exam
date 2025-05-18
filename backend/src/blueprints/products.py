from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from models.Product import Product

products_bp = Blueprint('products', __name__)

@products_bp.route('/products', methods=['GET'])
@jwt_required()
def get_all_products():
    products = Product.query.all()
    return jsonify([
        {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "category": product.category,
            "price": product.price
        } for product in products
    ])
