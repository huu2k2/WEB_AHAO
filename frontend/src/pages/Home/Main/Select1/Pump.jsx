import imgbump from "@assets/bump.png";
import imgbumperr from "@assets/bumperr.png";
import { useRef, useEffect } from "react";
import Socket from "../../../../ws";
export const Pump = ({
  index,
  status,
  mode,
  setPump,
  select,
  urlSocketPumpOn,
  urlSocketPumpOff,
  urlSocketPumpSelect,
}) => {
  const socketPumpOn = useRef(null);
  const socketPumpOff = useRef(null);
  const socketPumpSelect = useRef(null);

  useEffect(() => {
    if (!socketPumpOn.current) {
      socketPumpOn.current = new Socket();
      socketPumpOn.current.connectWebSocket(urlSocketPumpOn);
    }

    if (!socketPumpOff.current) {
      socketPumpOff.current = new Socket();
      socketPumpOff.current.connectWebSocket(urlSocketPumpOff);
    }

    if (!socketPumpSelect.current) {
      socketPumpSelect.current = new Socket();
      socketPumpSelect.current.connectWebSocket(urlSocketPumpSelect);
    }

    return () => {
      if (socketPumpOff.current) {
        socketPumpOff.current.disconnectWebSocket();
      }
      if (socketPumpOn.current) {
        socketPumpOn.current.disconnectWebSocket();
      }
    };
  }, []);

  const handlePump = (action) => {
    if (action === "on") {
      setPump(true);
      socketPumpOn.current.sendMessage(`pump ${index + 1} on`);
      socketPumpOn.current.getMessage((receivedData) => {
        console.log(receivedData);
      });
    } else if (action == "off") {
      setPump(false);
      socketPumpOff.current.sendMessage(`pump ${index + 1} off`);
      socketPumpOff.current.getMessage((receivedData) => {
        console.log(receivedData);
      });
    } else {
      socketPumpSelect.current.sendMessage(`pump ${index + 1} select`);
      socketPumpSelect.current.getMessage((receivedData) => {
        console.log(receivedData);
      });
    }
  };
  return (
    <div className="flex flex-col items-center space-y-4 flex-1">
      <div className="w-60 h-60 border flex items-center justify-center object-cover">
        <img
          src={status ? imgbumperr : imgbump}
          alt="Hinh bom 1"
          className="w-full "
        />
      </div>
      <div className="flex space-x-2">
        <button
          className="btn btn-success"
          disabled={mode === "AUTO" ? true : mode === "MANUAL" ? false : true}
          onClick={() => handlePump("on")}
        >
          START
        </button>
        <button
          className="btn btn-error"
          disabled={mode === "AUTO" ? true : mode === "MANUAL" ? false : true}
          onClick={() => handlePump("off")}
        >
          STOP
        </button>
        <button
          className="btn btn-success"
          disabled={select == true || select == null}
          onClick={() => handlePump("select")}
        >
          Select
        </button>
      </div>
    </div>
  );
};