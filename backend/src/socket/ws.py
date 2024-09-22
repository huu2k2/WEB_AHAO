 # plc1_routes.py
def websocket(sock):
    @sock.route('/PLC1/Auto')
    def websocket_route(ws):
        while True:
            data = ws.receive()  # Nhận dữ liệu từ client qua /PLC1/Auto
            if data:
                print(f"Received in /PLC1/Auto: {data}")  # In dữ liệu nhận được
                # Xử lý dữ liệu cho chế độ Auto
                if data == '1':
                    ws.send("PLC1 Auto mode activated")  # Trả lời khi nhận tín hiệu '1'
                else:
                    ws.send(f"Echo from /PLC1/Auto: {data}")  # Gửi lại dữ liệu
