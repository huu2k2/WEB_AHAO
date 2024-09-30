import json
import random
from ..device import newPLC
from .urlPLCs import plc1

def pcl1_search_ip(sock, plc_instance):
    @sock.route('/PLC1/SearchIP')
    def SearchIP(ws):
        while True:
            data = ws.receive()
            if data:
                if plc_instance.isconnect == False:
                    plc_instance.connect(data, 0, 0)
                
                if plc_instance.isconnect:
                    plc_instance.writeBool(8, 0, 0, 1)
                    ws.send(json.dumps( {"Status": 1, "Message": "Kết nối PLC thành công"}))
                else:
                    plc_instance.writeBool(8, 0, 0, 0) 
                    ws.send(json.dumps( {"Status": 0, "Message": "Kết nối PLC thất bại"}))