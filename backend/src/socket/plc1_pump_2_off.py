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