from src.socket import runsocket
from src import create_app
from flask_sock import Sock
import os
import sys

sys.path.append(os.path.abspath(os.path.dirname(__file__)))
global plc_intances
app = create_app()
sock = Sock(app)
runsocket(sock)
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)