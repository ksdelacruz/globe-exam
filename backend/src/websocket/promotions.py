import random
from flask_socketio import Namespace, emit
from faker import Faker
from threading import Thread
from time import sleep
from models.Product import Product
from models import db
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

fake = Faker()

class PromotionsNamespace(Namespace):
    def on_connect(self):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            print(f'User {user_id} connected to promotions channel')
        except Exception as e:
            print('Unauthorized websocket connection attempt:', e)
            return False  # Refuse connection

    def on_disconnect(self):
        print('Client disconnected from promotions channel')


def generate_promotion_message():
    products = Product.query.all()
    if not products:
        return None
    product = random.choice(products)
    name = fake.name()
    discount = random.randint(0, 80)
    return f"{name} just bought {product.name} at {discount}% off!"


def start_promotions_broadcast(socketio, app):
    def broadcast_loop():
        with app.app_context():
            while True:
                msg = generate_promotion_message()
                if msg:
                    socketio.emit('promotion', {'message': msg}, namespace='/promotions')
                sleep(random.randint(7, 15))
    t = Thread(target=broadcast_loop, daemon=True)
    t.start()
