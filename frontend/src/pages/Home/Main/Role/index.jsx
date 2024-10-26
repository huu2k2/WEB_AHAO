import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Form from "./form";

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

  const handleEdit = (id) => {
    console.log("Edit item:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete item:", id);
  };

  const handleAddNew = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      description: "",
    });
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
          handleCloseModal={handleCloseModal}
          formData={formData}
          setFormData={setFormData}
        />
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
