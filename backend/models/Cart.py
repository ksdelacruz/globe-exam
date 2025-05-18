from models import db
from models.Product import Product

class Cart(db.Model):
    __tablename__ = 'cart'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    checkout_date = db.Column(db.DateTime, nullable=True)

    # Add this line:
    product = db.relationship('Product', backref='cart_items', lazy='joined')