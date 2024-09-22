import json
import time
import random

def plc_pump_status(sock, plc_instance):
    @sock.route('/PLC1/Pump/Stutus')
    def plc_pump_status_route(ws):
        while True:
            B = 1
            status = None
            if plc_instance.isconnect:
                statusManual = plc_instance.readBool(8,B,0)
                statusAuto = plc_instance.readBool(8,B,1)
                statusError = plc_instance.readBool(8,B,2)
                statusPump1 = plc_instance.readBool(8,B,3)
                statusPump2 = plc_instance.readBool(8,B,4)
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
                             "Tank": 50
                         }
                     } 
                print(data)
                ws.send(json.dumps(data))
                time.sleep(0.5)