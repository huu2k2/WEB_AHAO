import React from "react";

const Index = ({ isUpdate, handleCloseModal, formData, setFormData }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isUpdate) {
      // call api
    } else {
      // call api
    }

    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
        <h3 className="text-xl font-bold mb-6 text-gray-800">
          Biểu mẫu{" "}
          {isUpdate
            ? "chỉnh sửa thông tin thiết bị"
            : "thêm thông tin thiết bị"}
        </h3>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Tên"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="ip_address"
              value={formData.ip_address}
              onChange={handleInputChange}
              placeholder="Địa chỉ IP"
              className="border p-2 rounded"
              required
            />
            <textarea
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Vị trí"
              className="border p-2 rounded col-span-2"
              rows="4"
              required
            />
            <textarea
              name="config"
              value={formData.config}
              onChange={handleInputChange}
              placeholder="Cấu hình"
              className="border p-2 rounded col-span-2"
              rows="4"
              required
            />
            <input
              type="text"
              name="lib_name"
              value={formData.lib_name}
              onChange={handleInputChange}
              placeholder="Thư viện"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="tag_input"
              value={formData.tag_input}
              onChange={handleInputChange}
              placeholder="Tag Input"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="tag_output"
              value={formData.tag_output}
              onChange={handleInputChange}
              placeholder="Tag Output"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="tag_value"
              value={formData.tag_value}
              onChange={handleInputChange}
              placeholder="Tag Value"
              className="border p-2 rounded"
              required
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-300 px-4 py-2 rounded mr-2"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
