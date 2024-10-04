import json
import time
import random

def statistics(sock,):
    @sock.route('/Statistics')
    def statistics(ws):
        while True:
            electricity = random.choice([10,50,40,30,20,60,80])
            water = random.choice([10,50,40,30,20,60,80])
            data = {"electricity": electricity, "water": water}
            ws.send(json.dumps(data))
            time.sleep(3)