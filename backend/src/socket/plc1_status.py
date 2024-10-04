import json
import time
import random

def plc_pump_status(sock, plc_instance):
    @sock.route('/PLC1/Pump/Stutus')
    def plc_pump_status_route(ws):
        while True:
            B = 1
            status = None
            statusManual = None
            statusAuto = None
            statusError = None
            statusPump1 = None
            statusPump2 = None
            select1 = None
            select2 = None
            conn = plc_instance.isconnect
            if conn:
                statusManual = plc_instance.readBool(8,B,0)
                statusAuto = plc_instance.readBool(8,B,1)
                statusError = plc_instance.readBool(8,B,2)
                statusPump1 = plc_instance.readBool(8,B,3)
                statusPump2 = plc_instance.readBool(8,B,4)
                select1 = plc_instance.readBool(8,B,5)
                select2 = plc_instance.readBool(8,B,6)
                if statusAuto:
                    status = "AUTO"
                elif statusManual:
                    status = "MANUAL"
                elif statusError:
                    status = "ERROR"
                else:
                    status = None
            data = {
                    "PLC1": 
                        {
                            "PUMP1": statusPump1, # 1 is on, 0 is off
                            "PUMP2": statusPump2, 
                            "Status": status,
                            "Tank": 0,
                            "Conn": conn,
                            "Select_1": select1,
                            "Select_2": select2,
                        }
                    } 
            ws.send(json.dumps(data))
            time.sleep(1)