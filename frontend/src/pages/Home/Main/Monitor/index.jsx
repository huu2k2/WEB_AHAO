import React, { useState, useEffect, useRef } from "react";
import Socket from "../../../../ws";
import { StatusControl } from "./StatusControl";
import { Alert } from "./Alert";
import { Tank } from "./Tank";
import { ElectricityMeter } from "./ElectricityMeter";
import { PumpMeter } from "./PumpMeter";
import { FlowMeter } from "./FlowMeter";
import { Pump } from "./Pump";
import { ConnStatus } from "./ConnStatus";
import ROUTES from "../../../../ws/routers";

const index = () => {
  const [data, setData] = useState({
    Conn: null,
    Mode: null,
    Status: null,
    Current: null,
    Voltage: null,
    Power: null,
    Tpump1: null,
    Tpump2: null,
    Flow: null,
    waterLevel: 0,
    Select1: null,
    Select2: null,
    PUMP1: false,
    PUMP2: false,
  });

  const Pumps = [
    {
      name: "BƠM 1",
      urlSocketPumpOn: ROUTES.PUMP_1_ON,
      urlSocketPumpOff: ROUTES.PUMP_1_OFF,
      urlSocketPumpSelect: ROUTES.PUMP_1_SELECT,
    },
    {
      name: "BƠM 2",
      urlSocketPumpOn: ROUTES.PUMP_2_ON,
      urlSocketPumpOff: ROUTES.PUMP_2_OFF,
      urlSocketPumpSelect: ROUTES.PUMP_2_SELECT,
    },
  ];

  const socketMainPLC1 = useRef(null);

  useEffect(() => {
    if (!socketMainPLC1.current) {
      socketMainPLC1.current = new Socket();
      socketMainPLC1.current.connectWebSocket(ROUTES.PCL1_STATUS);
    }

    socketMainPLC1.current.getMessage((receivedData) => {
      const plc = JSON.parse(receivedData);
      if (JSON.stringify(plc.PLC1) !== JSON.stringify(data)) {
        setData(plc.PLC1);
      }
    });

    return () => {
      if (socketMainPLC1.current) {
        socketMainPLC1.current.disconnectWebSocket();
      }
    };
  }, []);

  useEffect(() => {
    // console.log("Data after setData:", data);
  }, [data]);

  return (
    <div className="p-10 flex flex-col items-center space-y-8 bg-gray-50">
      <div className="w-[90%] flex justify-between items-center">
        <ConnStatus status={data.Conn} />
        <StatusControl mode={data.Status} />
        <Alert activeButton={data.Status} />
      </div>
      <div className="w-[90%] flex justify-between items-center">
        <ElectricityMeter
          amp={data.Current}
          vol={data.Voltage}
          pow={data.Power}
        ></ElectricityMeter>
        <PumpMeter tpump1={data.Tpump1} tpump2={data.Tpump2}></PumpMeter>
        <FlowMeter flow={data.Flow}></FlowMeter>
      </div>
      <div className="w-[90%] flex justify-between items-center h-[400px] gap-4">
        <Tank waterLevel={0} />
        <div className="flex space-x-16  bg-white shadow-md rounded-lg p-10 w-[70%] h-full">
          {Pumps.map((i, index) => (
            <Pump
              key={index}
              index={index}
              name={i.name}
              mode={data.Status}
              urlSocketPumpOff={i.urlSocketPumpOff}
              urlSocketPumpOn={i.urlSocketPumpOn}
              urlSocketPumpSelect={i.urlSocketPumpSelect}
              status={index == 0 ? data.PUMP1 : data.PUMP2}
              select={index == 0 ? data.Select1 : data.Select2}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default index;
