import json
import time
import random

from ..device import newPLC

from .urlPLCs import plc1

def plc1_auto(sock,plc_instance):
    @sock.route('/PLC1/Auto')
    def plc1_auto_route(ws):
        while True:
            data = ws.receive()
            if plc_instance.isconnect and data:
                A = 0
                plc_instance.writeBool(8,A,1,1) #  data is number  
                plc_instance.writeBool(8,A,0,0) #  data is number      





                

