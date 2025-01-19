import json
import time
import random

def plc_pump_status(sock, plc_instance):
    @sock.route('/PLC1/Pump/Stutus')
    def plc_pump_status_route(ws):
        B = 1
        status = None
        statusManual = None
        statusAuto = None
        statusError = None
        statusPump1 = None
        statusPump2 = None
        select1 = None
        select2 = None
        tanklevel = None
        waterLevel = 10
        pow = 0.0
        vol = 0.0
        amp = 0.0
        flow = 0.0
        tpump1 = 0
        tpump2 = 0
        while True:
            conn = plc_instance.isconnect
            if conn:
                statusManual = plc_instance.readBool(8,B,0)
                statusAuto = plc_instance.readBool(8,B,1)
                statusError = plc_instance.readBool(8,B,2)
                statusPump1 = plc_instance.readBool(8,B,3)
                statusPump2 = plc_instance.readBool(8,B,4)
                select1 = plc_instance.readBool(8,B,5)
                select2 = plc_instance.readBool(8,B,6)
                tanklevel = plc_instance.readBool(8,B,7)

                pow = plc_instance.readDB(7,116,4)
                if pow == None:
                    pow = 0.0

                vol = plc_instance.readDB(7,12,4)
                if vol == None:
                    vol = 0.0

                amp = plc_instance.readDB(7,44,4)
                if amp == None:
                    amp = 0.0
                    
                tpump1 = plc_instance.readDB(6,0,4)
                tpump2 = plc_instance.readDB(6,4,4)
                flow += 0.82



                if tanklevel:
                    waterLevel = 10
                else:
                    waterLevel = 100

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
                            "Tank": waterLevel,
                            "Conn": conn,
                            "Select1": select1,
                            "Select2": select2,
                            "Power": round(pow, 2),
                            "Voltage": round(vol, 2),
                            "Current": round(amp, 2),
                            "Flow": round(flow, 2),
                            "Tpump1": tpump1,
                            "Tpump2": tpump2,
                        }
                    } 
            ws.send(json.dumps(data))
            time.sleep(1)