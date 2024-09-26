def plc1_pump2Off(sock,plc_instance):
    @sock.route('/PLC1/Pump2/Off')
    def plc1_pump2Off_route(ws):
        while True:
            message = ws.receive()
            print(f"Received in 2: {message}")
            if plc_instance.isconnect:
                A = 0
                plc_instance.writeBool(8,A,5,1)
                plc_instance.writeBool(8,A,4,0)

def plc1_pump2On(sock,plc_instance):
    @sock.route('/PLC1/Pump2/On')
    def plc1_pump2On_route(ws):
        while True:
            message = ws.receive()
            print(f"Received in 2: {message}")
            if plc_instance.isconnect:
                A = 0
                plc_instance.writeBool(8,A,4,1)
                plc_instance.writeBool(8,A,5,0)


def plc1_pump2Select(sock,plc_instance):
    @sock.route('/PLC1/Pump2/Select')
    def plc1_pump2Select(ws):
        while True:
            message = ws.receive()
            print(f"Received in 1: {message}")
            if plc_instance.isconnect:
                A = 0
                plc_instance.writeBool(8,A,7,1)