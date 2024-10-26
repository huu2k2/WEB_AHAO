from flask import Blueprint, request, jsonify
from ...models import db, Device
from .. import api

@api.route('/devices', methods=['GET'])
def get_devices():
    devices = Device.query.all()
    return jsonify([device.to_dict() for device in devices])

@api.route('/devices', methods=['POST'])
def create_device():
    data = request.json
    new_device = Device(
        name=data['name'],
        ip_address=data['ip_address'],
        lib_name=data['lib_name'],
        config=data.get('config'),
        location=data.get('location'),
        tag_input=data.get('tag_input'),
        tag_output=data.get('tag_output'),
        tag_value=data.get('tag_value')
    )
    db.session.add(new_device)
    db.session.commit()
    return jsonify(new_device.to_dict()), 201

@api.route('/devices/<int:id>', methods=['GET'])
def get_device(id):
    device = Device.query.get_or_404(id)
    return jsonify(device.to_dict())

@api.route('/devices/<int:id>', methods=['PUT'])
def update_device(id):
    device = Device.query.get_or_404(id)
    data = request.json
    for key, value in data.items():
        setattr(device, key, value)
    db.session.commit()
    return jsonify(device.to_dict())

@api.route('/devices/<int:id>', methods=['DELETE'])
def delete_device(id):
    device = Device.query.get_or_404(id)
    db.session.delete(device)
    db.session.commit()
    return '', 204