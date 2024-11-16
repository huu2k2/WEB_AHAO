import os
from flask import Flask

from .module.upload_file import create_upload_routes
from .models import db, User, Role, Device, Report
from flask_migrate import Migrate # type: ignore
import flask_admin 
from flask_admin.contrib.sqla import ModelView
import pymysql
pymysql.install_as_MySQLdb()
from .module import api


def create_app():
    app = Flask(__name__)
    app.config["DEBUG"] = True
    app.config["SECRET_KEY"] = "secret"
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456@localhost/plc'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads')
    db.init_app(app)
    Migrate(app, db)

    admin = flask_admin.Admin(app, name='PLC', template_mode='bootstrap4')
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Role, db.session))
    admin.add_view(ModelView(Device, db.session))
    admin.add_view(ModelView(Report, db.session))
    # Import routes vào
    app.register_blueprint(api, url_prefix='/api/v1')
    create_upload_routes(app)  

    return app
