from flask_sqlalchemy import SQLAlchemy # type: ignore
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import json

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)
    role = db.relationship('Role', back_populates='users')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'role_id': self.role_id,
            'role': self.role.name if self.role else None
        }

    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.String(255))
    users = db.relationship('User', back_populates='role')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }

class Device(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ip_address = db.Column(db.String(15), nullable=False)
    lib_name = db.Column(db.String(100), nullable=False)
    config = db.Column(db.Text)
    location = db.Column(db.String(255))
    tag_input = db.Column(db.Text)
    tag_output = db.Column(db.Text)
    tag_value = db.Column(db.Text)
    reports = db.relationship('Report', back_populates='device')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ip_address': self.ip_address,
            'lib_name': self.lib_name,
            'config': json.loads(self.config) if self.config else None,
            'location': self.location,
            'tag_input': json.loads(self.tag_input) if self.tag_input else None,
            'tag_output': json.loads(self.tag_output) if self.tag_output else None,
            'tag_value': json.loads(self.tag_value) if self.tag_value else None
        }

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    device_id = db.Column(db.Integer, db.ForeignKey('device.id'), nullable=False)
    time = db.Column(db.DateTime, default=datetime.utcnow)
    sampling_time = db.Column(db.Float, nullable=False)
    tag_value = db.Column(db.Text)
    description = db.Column(db.Text)
    device = db.relationship('Device', back_populates='reports')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'device_id': self.device_id,
            'time': self.time.isoformat(),
            'sampling_time': self.sampling_time,
            'tag_value': json.loads(self.tag_value) if self.tag_value else None,
            'description': self.description,
            'device_name': self.device.name if self.device else None
        }