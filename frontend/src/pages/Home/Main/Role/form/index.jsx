import React from "react";

const Index = ({ handleCloseModal, formData, setFormData }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
          Mẫu thêm vai trò mới
        </h3>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Tên"
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Mô tả"
              rows="4"
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-400 transition duration-300"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition duration-300"
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
