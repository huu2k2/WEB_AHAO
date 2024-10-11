import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Items = [
  { id: 1, title: "Giám sát và điều khiển", isActive: true, path: "monitor" },
  { id: 2, title: "Báo cáo hoạt động", isActive: false, path: "report" },
  { id: 3, title: "Lịch sử báo động", isActive: false, path: "history" },
];

const Drawer = () => {
  const [dataItem, setDataItem] = useState(Items);
  const navigate = useNavigate();

  const handeClick = (id, index) => {
    navigate(dataItem[index].path);
    const updatedItems = dataItem.map((item) => {
      return { ...item, isActive: item.id === id };
    });

    setDataItem(updatedItems);
  };

  return (
    <div className="drawer lg:drawer-open w-80">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side bg-[#08D7EB]">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 p-4 bg-[#08D7EB] text-white">
          {dataItem.map((i, index) => (
            <li
              key={index}
              className={`hover:bg-gray-50 hover:text-[#1D232A] rounded-lg ${
                i.isActive && "bg-gray-50 text-[#1D232A]"
              }`}
              onClick={() => handeClick(i.id, index)}
            >
              <a>{i.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
