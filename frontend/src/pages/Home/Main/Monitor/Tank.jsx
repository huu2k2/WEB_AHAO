import React from "react";
import image from "../../../../assets/image.png";

export const Tank = ({ waterLevel }) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-10 w-[28%] h-full">
      <div className="relative w-full h-full flex justify-center items-center bg-gray-400 rounded-md overflow-hidden">
        <div
          className="relative w-full h-full"
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute bottom-0"
            style={{
              height: "86%",
              width: "10%",
              left: "60%",
              bottom: "2%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              className="bg-blue-300"
              style={{
                height: `${waterLevel}%`,
                width: "100%",
                bottom: 0,
                position: "absolute",
              }}
            ></div>
          </div>
        </div>
      </div>
      <p className="mt-2 font-bold">Bể nước {waterLevel}%</p>
    </div>
  );
};
