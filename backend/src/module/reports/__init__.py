from flask import Blueprint, request, jsonify
from ...models import db, Report
from .. import api

@api.route('/reports', methods=['GET'])
def get_reports():
    reports = Report.query.all()
    return jsonify([report.to_dict() for report in reports])

@api.route('/reports', methods=['POST'])
def create_report():
    data = request.json
    new_report = Report(
        name=data['name'],
        device_id=data['device_id'],
        sampling_time=data['sampling_time'],
        tag_value=data.get('tag_value'),
        description=data.get('description')
    )
    db.session.add(new_report)
    db.session.commit()
    return jsonify(new_report.to_dict()), 201

@api.route('/reports/<int:id>', methods=['GET'])
def get_report(id):
    report = Report.query.get_or_404(id)
    return jsonify(report.to_dict())

@api.route('/reports/<int:id>', methods=['PUT'])
def update_report(id):
    report = Report.query.get_or_404(id)
    data = request.json
    for key, value in data.items():
        setattr(report, key, value)
    db.session.commit()
    return jsonify(report.to_dict())

@api.route('/reports/<int:id>', methods=['DELETE'])
def delete_report(id):
    report = Report.query.get_or_404(id)
    db.session.delete(report)
    db.session.commit()
    return '', 204