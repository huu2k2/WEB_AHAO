import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaInfoCircle } from "react-icons/fa";
import Form from "./form";
import Details from "./details";
const Index = () => {
  const data = [
    {
      id: "asd",
      name: "Thiết bị 1",
      ip_address: "192.168.1.1",
      lib_name: "Library A",
      config: "Config A",
      location: "Tầng 1",
      tag_input: "Input A",
      tag_output: "Output A",
      tag_value: "Value A",
    },
    {
      id: "asdd",
      name: "Thiết bị 2",
      ip_address: "192.168.1.2",
      lib_name: "Library B",
      config: "Config B",
      location: "Tầng 2",
      tag_input: "Input B",
      tag_output: "Output B",
      tag_value: "Value B",
    },
  ];
  const [detailData, setDetailData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    ip_address: "",
    lib_name: "",
    config: "",
    location: "",
    tag_input: "",
    tag_output: "",
    tag_value: "",
  });

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (id) => {
    console.log("Edit item:", id);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleAddNew = () => {
    setShowModal(true);
  };

  const handleShowDetail = (id) => {
    const detail = data.find((item) => item.id === id);
    setDetailData(detail);
    setShowDetailModal(true);
  };

  const confirmDelete = () => {
    console.log("Delete confirmed:", itemToDelete);
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setDetailData(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      ip_address: "",
      lib_name: "",
      config: "",
      location: "",
      tag_input: "",
      tag_output: "",
      tag_value: "",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Danh sách thiết bị</h2>
        <button
          onClick={handleAddNew}
          className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600"
        >
          <FaPlus className="mr-2" /> Thêm mới
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <Form
          handleCloseModal={handleCloseModal}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {showDetailModal && detailData && (
        <Details
          handleCloseDetailModal={handleCloseDetailModal}
          detailData={detailData}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa thiết bị này không?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-[20%] py-3 px-4 border-b text-left">Mã</th>
              <th className="w-[25%] py-3 px-4 border-b text-left">Tên</th>
              <th className="w-[45%] py-3 px-4 border-b text-left">Vị trí</th>
              <th className="w-[10%] py-3 px-4 border-b text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody className="min-h-[200px]">
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b truncate">{item.name}</td>
                <td className="py-2 px-4 border-b truncate">{item.location}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleShowDetail(item.id)}
                    className="text-blue-500 hover:text-blue-600"
                    title="Chi tiết"
                  >
                    <FaInfoCircle />
                  </button>
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-yellow-500 hover:text-yellow-600 ml-2"
                    title="Chỉnh sửa"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-600 ml-2"
                    title="Xoá"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {currentItems.length < itemsPerPage &&
              Array.from({ length: itemsPerPage - currentItems.length }).map(
                (_, index) => (
                  <tr key={`empty-${index}`}>
                    <td className="py-2 px-4 border-b" colSpan="4">
                      &nbsp;
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
