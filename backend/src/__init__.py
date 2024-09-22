from flask import Flask
from .module.hello import main_routes

def create_app():
    app = Flask(__name__)
    app.config["DEBUG"] = True
    app.config["SECRET_KEY"] = "secret"

    # Import routes vào
    app.register_blueprint(main_routes, url_prefix='/api/v1')

    return app
