import { useState } from 'react';
import ListDeviceComponment from '../../../components/ListDevice'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [device, setDevice] = useState("");
  return (
    <div className="navbar bg-[#1d232a] px-10 border-b-2 border-black">
      <div className="flex-1">
        {/* Button to open modal */}
        <button
          className="btn btn-ghost text-xl text-white"
          onClick={() => document.getElementById("modal_select_device").showModal()}
        >
          {device.name} Trường ĐH Sư Phạm
        </button>

        {/* Modal */}
        <dialog id="modal_select_device" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* Close button */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <h3 className="text-lg font-bold">Chọn thiết bị</h3>
            <ListDeviceComponment device={device}  setDevice={setDevice} />
          </div>
        </dialog>
      </div>

      {/* Avatar and dropdown */}
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link>Thiết lặp</Link>
            </li>
            <li>
              <Link to={"/login"}>Đăng xuất</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
