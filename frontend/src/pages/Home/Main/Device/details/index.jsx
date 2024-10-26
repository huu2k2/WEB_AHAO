import React from "react";
import { FaTimes } from "react-icons/fa";

const Index = ({ handleCloseDetailModal, detailData }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 relative">
        <button
          onClick={handleCloseDetailModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <FaTimes size={18} />
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          Chi tiết thiết bị
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Mã:</span>
            <span className="text-gray-900">{detailData.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Tên:</span>
            <span className="text-gray-900">{detailData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Địa chỉ IP:</span>
            <span className="text-gray-900">{detailData.ip_address}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Library:</span>
            <span className="text-gray-900">{detailData.lib_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Cấu hình:</span>
            <span className="text-gray-900">{detailData.config}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Vị trí:</span>
            <span className="text-gray-900">{detailData.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Tag Input:</span>
            <span className="text-gray-900">{detailData.tag_input}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Tag Output:</span>
            <span className="text-gray-900">{detailData.tag_output}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Tag Value:</span>
            <span className="text-gray-900">{detailData.tag_value}</span>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleCloseDetailModal}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-200"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
