from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.events import EVENT_JOB_EXECUTED, EVENT_JOB_ERROR
from datetime import datetime
from .models import db, DeviceParameter

class PLCDeviceMonitoring:
    def __init__(self, plc_client):
        self.plc_client  = plc_client  # Đối tượng snap7 client đã kết nối
        self.scheduler = BackgroundScheduler()
        self.scheduler.add_job(self.save_device_parameter_periodically, 'interval', minutes=30)
        self.scheduler.start()

    def save_device_parameter_periodically(self):
        # Lấy giá trị từ PLC và lưu vào database mỗi 30 phút
        if not self.plc_client.isconnect:
            print("PLC is not connected. Cannot save parameters.")
            return

        # Đọc giá trị từ PLC (ví dụ, tag_value hoặc các thông số khác)
        tag_value = self.plc_client.readMemory(0, 4)  # Đọc từ bộ nhớ PLC, ví dụ 4 byte
        # get id address de get id tu database cua backend 
        # update thong so vao ben duoi 
        if tag_value:
            # Lưu thông số vào database
            new_parameter = DeviceParameter(
                device_id=1,  # Thay đổi theo device_id thực tế
                parameter_name="Tag Value",  # Tên thông số
                parameter_value=tag_value[0],  # Lấy giá trị tag_value
                timestamp=datetime.utcnow(),  # Lưu thời gian hiện tại
                description="Periodic parameter from PLC"
            )
            db.session.add(new_parameter)
            db.session.commit()
            print(f"Parameter saved: {new_parameter.parameter_value} at {new_parameter.timestamp}")
        else:
            print("No valid tag value read from PLC.")

    def stop_scheduler(self):
        # Dừng scheduler nếu không cần nữa
        self.scheduler.shutdown()