import snap7
import time
import struct

class newPLC:
    # plcConnect = None
    def __init__(sefl):
      sefl.client = snap7.client.Client()
      sefl.isconnect = False

    def connect(sefl, ip_addr, rack, slot):
        try:
            sefl.client.connect(ip_addr, rack, slot)
            sefl.isconnect = sefl.client.get_connected()
        except:
            sefl.client.disconnect()
            sefl.isconnect = False

    def writeBool(sefl, db_number, start_offset, bit_offset, value): # 1 = true | 0 = false
        try:
          reading = sefl.client.db_read(db_number, start_offset, 1) # (db_number, start offset, read 1 byte)
          snap7.util.set_bool(reading, 0, bit_offset, value)   # (value 1= true;0=false) (bytearray_: bytearray, byte_index: int, bool_index: int, value: bool)
          sefl.client.db_write(db_number, start_offset, reading)       #  write back the bytearray and now the boolean value is changed in the PLC.
          # TODO: add function write infomation 
          # 
          return True
        except:
          return False
    
    def readBool(sefl, db_number, start_offset, bit_offset):
        try:
          reading = sefl.client.db_read(db_number, start_offset, 1)
          var = snap7.util.get_bool(reading, 0, bit_offset)
          print('DB Number: ' + str(db_number) + ' Bit: ' + str(start_offset) + '.' + str(bit_offset) + ' Value: ' + str(var))
          return var
        except:
           return None

    def readDB(sefl, db_number, start_address, length):
        try:
            reading = sefl.client.db_read(db_number, start_address, length)
            value = struct.unpack('>f', reading)[0] # big-endian
            #print('Start Address: ' + str(start_address) + ' Value: ' + str(reading))
            return value
        except:
            return None
        
    def readMemory(sefl, db_addr, start_address, length):
        try:
            reading = sefl.client.read_area(snap7.types.Areas.MK, db_addr, start_address, length)
            value = struct.unpack('>f', reading)  # big-endian
            print('Start Address: ' + str(start_address) + ' Value: ' + str(value))
            return value
        except:
            return None

    def writeMemory(sefl, start_address,length,value):
        try:
            sefl.client.mb_write(start_address, length, bytearray(struct.pack('>f', value)))  # big-endian
            print('Start Address: ' + str(start_address) + ' Value: ' + str(value))
            return True
        except:
            return None

#if __name__ == "__main__":
#    plc = newPLC()
#    while True:        
#        if plc.isconnect:
#            data = plc.readDB(7, 0, 4)
#            print('Read PLC db 7: ', data)
#        else:
#            print('Process connect PLC: ')
#            plc.connect("172.25.58.135", 0, 0)
#        time.sleep(1)
#         plc.readBool(7, 0, 1)
        # plc.writeMemory(start_address, length, 786.78)
        # plc.readMemory(start_address, length)
