from .plc1_search_ip import pcl1_search_ip 
from .plc1_manual import plc1_manual
from .plc1_status import plc_pump_status
from .plc1_auto import plc1_auto
from .plc1_pump_1 import plc1_pump1Off, plc1_pump1On, plc1_pump1Select
from .plc1_pump_2 import plc1_pump2On, plc1_pump2Off, plc1_pump2Select
from ..device import newPLC

plc_instance = newPLC()

def runsocket(sock):
    plc1_auto(sock, plc_instance)
    plc1_manual(sock, plc_instance)
    plc1_pump1Off(sock, plc_instance)
    plc1_pump1On(sock, plc_instance)
    plc1_pump2Off(sock, plc_instance)
    plc1_pump2On(sock, plc_instance)
    plc1_pump1Select(sock, plc_instance)
    plc1_pump2Select(sock, plc_instance)
    plc_pump_status(sock, plc_instance)
    pcl1_search_ip(sock, plc_instance)