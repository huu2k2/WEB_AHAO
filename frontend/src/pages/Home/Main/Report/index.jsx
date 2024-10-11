import React, { useState, useEffect, useRef } from "react";
import Socket from "../../../../ws";
import ROUTES from "../../../../ws/routers";
import Statistics from "../../../../components/Statistics";

const Index = () => {
  const socketStatistics = useRef(null);
  const [value, setValue] = useState({ electricity: 0, water: 0 });
  const [dataReceived, setDataReceived] = useState(false);

  useEffect(() => {
    if (!socketStatistics.current) {
      socketStatistics.current = new Socket();
      socketStatistics.current.connectWebSocket(ROUTES.STATISTICS);
    }

    socketStatistics.current.getMessage((receivedData) => {
      const data = JSON.parse(receivedData);
      console.log(data);
      setValue(data);
      setDataReceived(true);
    });

    return () => {
      if (socketStatistics.current) {
        socketStatistics.current.disconnectWebSocket();
      }
    };
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {dataReceived && (
          <>
            <Statistics
              title={"Lượng Điện Tiêu Thụ"}
              value={value.electricity}
              color={"orange"}
            />
            <Statistics
              title={"Lượng Nước Tiêu Thụ"}
              value={value.water}
              color={"blue"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
