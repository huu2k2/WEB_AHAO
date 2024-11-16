import os
from flask import Blueprint, flash, jsonify, redirect, request, url_for
from werkzeug.utils import secure_filename

from ...utils import ALLOWED_EXTENSIONS

upload_bp = Blueprint('upload', __name__)

def allowed_file(filename):
    """Kiểm tra file có phần mở rộng hợp lệ không."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def create_upload_routes(app):
    """Tạo API upload file với tham chiếu đến cấu hình của app."""

    # Tạo thư mục upload nếu chưa tồn tại
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    @upload_bp.route('/upload-form')
    def upload_form():
        return jsonify({"message": "Upload form route", "status": "success"})
    
    @upload_bp.route('/upload', methods=['POST'])
    def upload_file():
        """API xử lý upload file."""
        if 'file' not in request.files:
            flash("No file part", "error")
            return redirect(url_for('upload.upload_form'))

        file = request.files['file']
        if file.filename == '':
            flash("No selected file", "error")
            return redirect(url_for('upload.upload_form'))

        if not allowed_file(file.filename):
            flash("Invalid file type. Only allowed file types are permitted!", "error")
            return redirect(url_for('upload.upload_form'))

        # Tạo tên file an toàn và lưu vào thư mục
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        try:
            print("file_path",file_path)
            file.save(file_path)
            flash(f"File uploaded successfully: {filename}", "success")
            return jsonify({"message": "File uploaded successfully", "filename": filename}), 200
        except Exception as e:
            flash(f"Error saving file: {str(e)}", "error")
            return redirect(url_for('upload.upload_form'))

    app.register_blueprint(upload_bp, url_prefix='/api')
