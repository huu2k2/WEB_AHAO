from flask import Flask
from .module.hello import main_routes
from .models import db, User, Role, Device, Report
from flask_migrate import Migrate # type: ignore
import pymysql
pymysql.install_as_MySQLdb()

def create_app():
    app = Flask(__name__)
    app.config["DEBUG"] = True
    app.config["SECRET_KEY"] = "secret"
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456@localhost/plc'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    Migrate(app, db)

    # Import routes vào
    app.register_blueprint(main_routes, url_prefix='/api/v1')
    return app
