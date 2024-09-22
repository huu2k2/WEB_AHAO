def plc1_manual(sock, plc_instance):
    @sock.route('/PLC1/Manual')
    def plc1_manual_route(ws):
        while True:
            data = ws.receive()
            if plc_instance.isconnect and data:
                A = 0
                plc_instance.writeBool(8,A,0,1) # data is number
                plc_instance.writeBool(8,A,1,0)
