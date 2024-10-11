import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Socket from "../../../../ws";
import ROUTES from "../../../../ws/routers/index";

export const ConnStatus = ({ status }) => {
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

    setTimeout(() => {
      socketInput.current.sendMessage(ROUTES.IP);
    }, 1000);

    socketInput.current.getMessage((receivedData) => {
      setData(JSON.parse(receivedData));
    });

    return () => {
      if (socketInput.current) {
        socketInput.current.disconnectWebSocket();
      }
    };
  }, []);

  return (
    <div className="flex flex-col space-y-2">
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
    </div>
  );
};
