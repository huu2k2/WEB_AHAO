import React, { useState } from "react";
import { Plus, ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";
import Form from "./form";

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

  const [isUpdate, setIsUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
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

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (data) => {
    setFormData(data);
    setIsUpdate(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleAddNew = () => {
    setShowModal(true);
    setIsUpdate(false);
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
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={""}
            onChange={() => {}}
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleAddNew}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600"
          >
            <Plus className="w-4 h-4 mr-2" /> Thêm mới
          </button>
        </div>
      </div>

      {showModal && (
        <Form
          isUpdate={isUpdate}
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
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
              <th className="w-[5%] py-3 px-4 border-b"></th>
              <th className="w-[19%] py-3 px-4 border-b text-left">Mã</th>
              <th className="w-[19%] py-3 px-4 border-b text-left">Tên</th>
              <th className="w-[19%] py-3 px-4 border-b text-left">
                Địa chỉ IP
              </th>
              <th className="w-[19%] py-3 px-4 border-b text-left">Cấu hình</th>
              <th className="w-[19%] py-3 px-4 border-b text-left">Vị trí</th>
            </tr>
          </thead>
          <tbody className="min-h-[200px]">
            {currentItems.map((item) => (
              <React.Fragment key={item.id}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(item.id)}
                >
                  <td className="py-2 px-4 border-b text-center">
                    {expandedRow === item.id ? (
                      <ChevronDown className="inline-block w-4 h-4" />
                    ) : (
                      <ChevronRight className="inline-block w-4 h-4" />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b truncate">{item.name}</td>
                  <td className="py-2 px-4 border-b truncate">
                    {item.ip_address}
                  </td>
                  <td className="py-2 px-4 border-b truncate">{item.config}</td>
                  <td className="py-2 px-4 border-b truncate">
                    {item.location}
                  </td>
                </tr>
                {expandedRow === item.id && (
                  <tr>
                    <td colSpan="6" className="bg-gray-50 px-4 py-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold mb-4">
                            Thông tin chi tiết
                          </h3>
                          <div className="space-y-2">
                            <p>
                              <span className="font-medium">Tên thư viện:</span>{" "}
                              {item.lib_name}
                            </p>
                            <p>
                              <span className="font-medium">Tag Input:</span>{" "}
                              {item.tag_input}
                            </p>
                            <p>
                              <span className="font-medium">Tag Output:</span>{" "}
                              {item.tag_output}
                            </p>
                            <p>
                              <span className="font-medium">Tag Value:</span>{" "}
                              {item.tag_value}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(item);
                            }}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600 flex items-center"
                          >
                            <Pencil className="w-3 h-3 mr-1" /> Sửa
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item.id);
                            }}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 flex items-center"
                          >
                            <Trash2 className="w-3 h-3 mr-1" /> Xóa
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {currentItems.length < itemsPerPage &&
              Array.from({ length: itemsPerPage - currentItems.length }).map(
                (_, index) => (
                  <tr key={`empty-${index}`}>
                    <td className="py-2 px-4 border-b" colSpan="6">
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
