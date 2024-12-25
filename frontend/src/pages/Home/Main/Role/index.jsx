import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Form from "./form";
import { Edit, Trash } from "lucide-react";

const Index = () => {
  const data = [
    {
      id: "asd",
      name: "Thiết bị 1",
      description: "Tầng 1",
    },
    {
      id: "asdd",
      name: "Thiết bị 2",
      description: "Tầng 2",
    },
  ];

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (data) => {
    setFormData(data);
    setIsUpdate(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setShowDeleteConfirm(true);
    console.log(id);
  };

  const handleAddNew = () => {
    setShowModal(true);
    setIsUpdate(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      description: "",
    });
  };

  const confirmDelete = () => {
    console.log("Delete confirmed:", itemToDelete);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Danh sách vai trò</h2>
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
          isUpdate={isUpdate}
          handleCloseModal={handleCloseModal}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa vai trò này không?</p>
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
              <th className="w-[45%] py-3 px-4 border-b text-left">Mô tả</th>
              <th className="w-[10%] py-3 px-4 border-b text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody className="min-h-[200px]">
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b truncate">{item.name}</td>
                <td className="py-2 px-4 border-b truncate">
                  {item.description}
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item);
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600 flex items-center"
                    >
                      <Edit className="w-3 h-3 mr-1" /> Sửa
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 flex items-center"
                    >
                      <Trash className="w-3 h-3 mr-1" /> Xóa
                    </button>
                  </div>
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
