import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Items = [
  { id: 1, title: "Giám sát và hoạt động", isActive: true, path: "select1" },
  { id: 2, title: "Báo cáo hoạt động", isActive: false, path: "select2" },
];

const Drawer = () => {
  const [dataItem, setDataItem] = useState(Items);
  const navigate = useNavigate();

  const handeClick = (id, index) => {
    navigate(dataItem[index].path);
    const updatedItems = dataItem.map((item) => {
      // Tạo bản sao mới của từng đối tượng và cập nhật isActive
      return { ...item, isActive: item.id === id };
    });

    setDataItem(updatedItems);
  };

  return (
    <div className="drawer lg:drawer-open w-80">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 p-4 bg-[#1D232A] text-white">
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
