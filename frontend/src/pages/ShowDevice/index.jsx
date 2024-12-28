import React, { useState } from "react";
import ListDeviceComponment from "../../components/ListDevice";

const index = () => {
    const [device, setDevice] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
         Tat ca thiet bi
        </h2>

      <ListDeviceComponment device={device}  setDevice={setDevice} isChangePath={true}/>
      </div>
    </div>
  );
};

export default index;
