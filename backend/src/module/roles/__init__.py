from flask import Blueprint, request, jsonify
from ...models import db, Role
from .. import api

@api.route('/roles', methods=['GET'])
def get_roles():
    roles = Role.query.all()
    return jsonify([role.to_dict() for role in roles])

@api.route('/roles', methods=['POST'])
def create_role():
    data = request.json
    new_role = Role(name=data['name'], description=data.get('description'))
    db.session.add(new_role)
    db.session.commit()
    return jsonify(new_role.to_dict()), 201

@api.route('/roles/<int:id>', methods=['GET'])
def get_role(id):
    role = Role.query.get_or_404(id)
    return jsonify(role.to_dict())

@api.route('/roles/<int:id>', methods=['PUT'])
def update_role(id):
    role = Role.query.get_or_404(id)
    data = request.json
    role.name = data.get('name', role.name)
    role.description = data.get('description', role.description)
    db.session.commit()
    return jsonify(role.to_dict())

@api.route('/roles/<int:id>', methods=['DELETE'])
def delete_role(id):
    role = Role.query.get_or_404(id)
    db.session.delete(role)
    db.session.commit()
    return '', 204