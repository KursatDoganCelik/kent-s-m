import React, { useState } from "react";
import axios from "axios";

const PopupForm: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: null,
    imageUrl: "",
    stockQuantity: null,
    isActive: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const updatedValue =
      type === "checkbox"
        ? checked
        : type === "number"
          ? parseFloat(value)
          : value;

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: updatedValue,
      };
      if (name === "stockQuantity" && (updatedValue as number) > 0) {
        updatedData.isActive = true;
      }
      return updatedData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const placeHolderImg = "https://placehold.co/300x200?text=Placehold";
    const formattedDate = new Date()
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("-");
    try {
      await axios.post(`${import.meta.env.VITE_MOCK_API_BASE_URL}/products`, {
        ...formData,
        imageUrl: formData.imageUrl || placeHolderImg,
        stockQuantity: formData.stockQuantity || 0,
        createdAt: formattedDate,
        isActive: formData.stockQuantity && formData.stockQuantity > 0,
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to submit product.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white px-6 py-4 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              className="rm-arrow w-full rounded border px-4 py-2"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity || ""}
              onChange={handleChange}
              className="rm-arrow w-full rounded border px-4 py-2"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2 h-4 w-4 cursor-pointer rounded border-gray-300"
            />
            <label className="text-sm font-medium">Is Active</label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
