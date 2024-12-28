import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const listDevices = [
    { id: 1, name: "Trạm Bơm 1", isActive: true },
    { id: 2, name: "Trạm Bơm 2", isActive: false },
    { id: 3, name: "Trạm Bơm 3", isActive: true },
];

const ListDeviceComponment = ({ device, setDevice, isChangePath = false }) => {
    const [listDevice, setListDevice] = useState(listDevices);
    const navigate = useNavigate();  // Sử dụng useNavigate để điều hướng thay vì window.location.href

    useEffect(() => {
        // Đặt thiết bị mặc định khi lần đầu tiên render
        if (listDevices.length > 0) {
            setDevice(listDevices[0]);
        }
    }, [setDevice]);

    const handlePickDevice = (id) => {
        if (isChangePath) {
            navigate(`/deviceId/${id}/monitor`);
        }
        else {
            const selectedDevice = listDevice.find((i) => i.id === id);
            if (selectedDevice) {
                setDevice(selectedDevice);

            }
            document.getElementById("modal_select_device").close();
        }
    };

    return (
        <div>
            <ul className="py-4">
                {listDevice.map((item) => (
                    <li
                        key={item.id}
                        className={`py-2 my-1 px-4 rounded-lg cursor-pointer bg-gray-600 flex justify-between hover:bg-slate-500 font-bold`}
                        onClick={() => handlePickDevice(item.id)}
                    >
                        <span>{item.name}</span>

                        <span
                            className={`${item.isActive ? "bg-green-500" : "bg-red-500"
                                } font-bold rounded-full w-5 h-5`}
                        ></span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListDeviceComponment;
