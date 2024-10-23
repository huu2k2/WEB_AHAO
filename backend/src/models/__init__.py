from flask_sqlalchemy import SQLAlchemy # type: ignore
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)
    role = db.relationship('Role', back_populates='users')

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.String(255))
    users = db.relationship('User', back_populates='role')

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

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    device_id = db.Column(db.Integer, db.ForeignKey('device.id'), nullable=False)
    time = db.Column(db.DateTime, default=datetime.utcnow)
    sampling_time = db.Column(db.Float, nullable=False)
    tag_value = db.Column(db.Text)
    description = db.Column(db.Text)
    device = db.relationship('Device', back_populates='reports')