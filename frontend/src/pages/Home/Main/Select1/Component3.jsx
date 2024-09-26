import React from "react";
import image from "../../../../assets/image.png";

export const Component3 = ({ waterLevel }) => {
  return (
    <div className="flex flex-col items-center border border-dashed border-gray-500 p-10 rounded-lg w-[28%] h-full">
      <div
        className="relative w-32 h-64 bg-gray-400 rounded-md overflow-hidden"
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          className="absolute bottom-0"
          style={{
            height: "86%",
            width: "50px",
            left: "60%",
            bottom: "8px",
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
      <p className="mt-2 font-bold">Bể nước {waterLevel}</p>
    </div>
  );
};
