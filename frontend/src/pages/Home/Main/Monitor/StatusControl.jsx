import React, { useEffect, useRef } from "react";
import Socket from "../../../../ws";
import ROUTES from "../../../../ws/routers/index";
import Button from "../../../../components/Button";

export const StatusControl = ({ mode }) => {
  const socketAuto = useRef(null);
  const socketManual = useRef(null);

  useEffect(() => {
    if (!socketAuto.current) {
      socketAuto.current = new Socket();
      socketAuto.current.connectWebSocket(ROUTES.AUTO);
    }

    if (!socketManual.current) {
      socketManual.current = new Socket();
      socketManual.current.connectWebSocket(ROUTES.MANUAL);
    }

    socketManual.current.getMessage((receivedData) => {
      console.log(receivedData);
    });

    socketAuto.current.getMessage((receivedData) => {
      console.log(receivedData);
    });

    return () => {
      if (socketAuto.current) {
        socketAuto.current.disconnectWebSocket();
      }

      if (socketManual.current) {
        socketManual.current.disconnectWebSocket();
      }
    };
  }, []);

  const handleManual = () => {
    if (socketManual.current) {
      socketManual.current.sendMessage("MANUAL");
    }
  };

  const handleAuto = () => {
    if (socketAuto.current) {
      socketAuto.current.sendMessage("AUTO");
    }
  };

  const Buttons = [
    { title: "AUTO", handleButton: handleAuto },
    { title: "MANUAL", handleButton: handleManual },
  ];

  return (
    <div className="flex space-x-4  bg-white shadow-md rounded-lg p-10">
      {Buttons.map((item, index) => (
        <Button
          key={index}
          title={item.title}
          handleButton={item.handleButton}
          mode={mode}
        />
      ))}
    </div>
  );
};
