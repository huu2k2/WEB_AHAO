import React, { useState } from "react";
import Button from "../../../../components/Button";

export const Alert = ({ activeButton }) => {
  const Buttons = [
    { title: "AUTO", handleButton: () => {} },
    { title: "MANUAL", handleButton: () => {} },
    { title: "ERROR", handleButton: () => {} },
  ];

  return (
    <div className="flex space-x-4 bg-white shadow-md rounded-lg p-10">
      <button
        className={`btn rounded-full w-20 h-20 ${
          activeButton === "AUTO" ? "btn-success" : "btn-outline"
        }`}
      >
        AUTO
      </button>

      <button
        className={`btn rounded-full w-20 h-20 ${
          activeButton === "MANUAL" ? "btn-info" : "btn-outline"
        }`}
      >
        MANUAL
      </button>

      <button
        className={`btn rounded-full w-20 h-20 ${
          activeButton === "ERROR" ? "btn-error" : "btn-outline"
        }`}
      >
        ERROR
      </button>
    </div>
  );
};
