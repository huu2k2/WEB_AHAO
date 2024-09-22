from flask import Blueprint

main_routes = Blueprint('main', __name__)

@main_routes.route('/hello',methods=['GET'])
def home():
    return "Hello from Huu"