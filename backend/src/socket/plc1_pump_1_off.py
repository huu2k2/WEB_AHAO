def plc1_pump1Off(sock,plc_instance):
    @sock.route('/PLC1/Pump1/Off')
    def plc1_pump1Off_route(ws):
        while True:
            message = ws.receive()
            print(f"Received in 1: {message}")
            if plc_instance.isconnect:
                A = 0
                plc_instance.writeBool(8,A,3,1)
                plc_instance.writeBool(8,A,2,0)