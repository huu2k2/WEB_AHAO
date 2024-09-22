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