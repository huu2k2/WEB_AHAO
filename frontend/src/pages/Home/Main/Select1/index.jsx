import React, { useState, useEffect, useRef } from "react";
import Socket from "../../../../ws";
import { Component1 } from "./Component1";
import { Component2 } from "./Component2";
import { Component3 } from "./Component3";
import { Pump } from "./Pump";
import { InputComponent } from "./InputComponent";
import ROUTES from "../../../../ws/routers";

const index = () => {
  const [mode, setMode] = useState(null);
  const [pump1Status, setPump1Status] = useState(false);
  const [pump2Status, setPump2Status] = useState(false);
  const [waterLevel, setWaterLevel] = useState(0);
  const [conn, SetConn] = useState(null);
  const [status, setStatus] = useState("");
  const [select1, SetSelect1] = useState(null);
  const [select2, SetSelect2] = useState(null);

  const Pumps = [
    {
      name: "pump1",
      status: pump1Status,
      setPump: setPump1Status,
      urlSocketPumpOn: ROUTES.PUMP_1_ON,
      urlSocketPumpOff: ROUTES.PUMP_1_OFF,
      urlSocketPumpSelect: ROUTES.PUMP_1_SELECT,
    },
    {
      name: "pump2",
      status: pump2Status,
      setPump: setPump2Status,
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
      const data = JSON.parse(receivedData);
      console.log(data);
      setWaterLevel(data.PLC1?.Tank);
      setPump1Status(data.PLC1?.PUMP1);
      setPump2Status(data.PLC1?.PUMP2);
      setStatus(data.PLC1?.Status);
      setMode(data.PLC1?.Status);
      SetConn(data.PLC1?.Conn);
      SetSelect1(data.PLC1?.Select_1);
      SetSelect2(data.PLC1?.Select_2);
    });

    return () => {
      if (socketMainPLC1.current) {
        socketMainPLC1.current.disconnectWebSocket();
      }
    };
  }, []);

  return (
    <div className="p-10 flex flex-col items-center space-y-8">
      <div className="w-[90%] flex justify-between items-center">
        <InputComponent status={conn} />
        <Component1 mode={mode} setMode={setMode} />
        <Component2 activeButton={status} />
      </div>
      <div className="w-[90%] flex justify-between items-center h-[400px] gap-4">
        <Component3 waterLevel={waterLevel} />
        <div className="flex space-x-16 border border-dashed border-gray-500 p-10 rounded-lg w-[70%] h-full">
          {Pumps.map((i, index) => (
            <Pump
              key={index}
              index={index}
              status={i.status}
              mode={mode}
              setPump={i.setPump}
              urlSocketPumpOff={i.urlSocketPumpOff}
              urlSocketPumpOn={i.urlSocketPumpOn}
              urlSocketPumpSelect={i.urlSocketPumpSelect}
              select={index == 0 ? select1 : select2}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default index;
