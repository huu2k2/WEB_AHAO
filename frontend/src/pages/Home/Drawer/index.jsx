import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Items = [
  { id: 1, title: "Giám sát và điều khiển", isActive: true, path: "monitor" },
  { id: 2, title: "Báo cáo hoạt động", isActive: false, path: "report" },
  { id: 3, title: "Lịch sử báo động", isActive: false, path: "history" },
  { id: 4, title: "Quản lí thiết bị", isActive: false, path: "device" },
  { id: 5, title: "Quản lí vai trò", isActive: false, path: "role" },
  { id: 6, title: "Quản lí tài khoản", isActive: false, path: "account" },
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

      <div className="drawer-side bg-[#rgb(29,35,42)]">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 p-4 bg-[#rgb(29,35,42)] text-white">
          {dataItem.map((i, index) => (

            <li
              key={index}
              className={`hover:bg-gray-50 hover:text-[#1D232A] rounded-lg ${i.isActive && "bg-gray-50 text-[#1D232A] text-bold"
                }`}
              onClick={() => handeClick(i.id, index)}
            >
              <Link to={i.path}>
                {i.title}
              </Link>
            </li>

          ))}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
