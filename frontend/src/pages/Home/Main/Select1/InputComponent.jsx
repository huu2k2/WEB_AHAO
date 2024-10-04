import React, { useState, useRef, useEffect } from "react";
import Socket from "../../../../ws";
import ROUTES from "../../../../ws/routers/index";

export const InputComponent = ({ status }) => {
  const [getText, setText] = useState(() => {
    const savedData = localStorage.getItem("ip");
    return savedData ? savedData : "";
  });
  const [data, setData] = useState(null);
  const socketInput = useRef(null);

  useEffect(() => {
    if (!socketInput.current) {
      socketInput.current = new Socket();
      socketInput.current.connectWebSocket(ROUTES.SEARCH_IP);
    }

    socketInput.current.getMessage((receivedData) => {
      setData(JSON.parse(receivedData));
    });

    return () => {
      if (socketInput.current) {
        socketInput.current.disconnectWebSocket();
      }
    };
  }, []);

  const handleChangeValue = (e) => {
    setText(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      socketInput.current.sendMessage(getText);
      localStorage.setItem("ip", getText);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <input
        id="ip-input"
        type="text"
        value={getText}
        placeholder="Nhập IP máy..."
        className="input input-bordered input-accent w-full max-w-xs"
        onChange={handleChangeValue}
        onKeyDown={handleEnter}
      />
      {status != null && getText != "" && (
        <div
          className={`text-sm font-medium p-2 rounded-md ${
            status === true
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status === true
            ? "PLC kết nối thành công"
            : status === false
            ? "PLC kết nối thất bại"
            : ""}
        </div>
      )}
    </div>
  );
};
