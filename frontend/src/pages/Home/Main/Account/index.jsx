import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Form from "./form";

const Index = () => {
  const data = [
    {
      id: "1",
      username: "user1",
      role: "vai trò 1",
    },
    {
      id: "2",
      username: "user2",
      role: "vai trò 2",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    console.log("Delete item:", id);
  };

  const handleAddNew = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Danh sách tài khoản</h2>
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
              <th className="w-[25%] py-3 px-4 border-b text-left">
                Tên tài khoản
              </th>
              <th className="w-[45%] py-3 px-4 border-b text-left">Vai trò</th>
              <th className="w-[10%] py-3 px-4 border-b text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody className="min-h-[200px]">
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b truncate">{item.username}</td>
                <td className="py-2 px-4 border-b truncate">{item.role}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-600"
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
