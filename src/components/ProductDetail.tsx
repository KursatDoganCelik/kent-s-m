import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Product } from "../types";

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    brand: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    imageUrl: "",
    createdAt: "",
    isActive: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fetchProductByID = async () => {
    try {
      const response = await axios.get<Product>(
        `${import.meta.env.VITE_MOCK_API_BASE_URL}/products/${id}`,
      );
      setProduct(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductByID();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_MOCK_API_BASE_URL}/products/${product.id}`,
      );
      navigate("/products");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete the product.");
    }
  };

  const handleUpdate = async () => {
    const placeHolderImg = "https://placehold.co/300x200?text=Placehold";
    try {
      const updatedProduct = {
        ...product,
        imageUrl: product.imageUrl || placeHolderImg,
        isActive: product.stockQuantity && product.stockQuantity > 0,
      };

      const response = await axios.put<Product>(
        `${import.meta.env.VITE_MOCK_API_BASE_URL}/products/${product.id}`,
        updatedProduct,
      );
      setProduct(response.data);
      setEditMode(false);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update the product.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "price" || name === "stockQuantity"
        ? parseFloat(value) || 0
        : value;

    setProduct({ ...product, [name]: parsedValue });
  };

  if (loading) {
    return (
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold">Loading...</h2>
        <p className="text-gray-600">
          Please wait while we fetch the product list for you.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 text-center text-red-600">
        <h2 className="text-2xl font-semibold">Error</h2>
        <p>{error}</p>
        <p>Try refreshing the page or check your internet connection.</p>
      </div>
    );
  }

  return (
    <div key={product.id} className="rounded-xl bg-white p-6">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="mb-4 h-56 w-fit rounded-lg object-cover"
      />
      {editMode ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label className="w-28 font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="w-1/3 rounded-md border px-2 py-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-28 font-medium text-gray-700">Brand:</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              placeholder="Brand"
              className="w-1/3 rounded-md border px-2 py-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-28 font-medium text-gray-700">
              Description:
            </label>
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-1/3 rounded-md border px-2 py-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-28 font-medium text-gray-700">Price:</label>
            <input
              type="number"
              name="price"
              value={product.price || ""}
              onChange={handleInputChange}
              placeholder="Price"
              className="rm-arrow w-1/3 rounded-md border px-2 py-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-28 font-medium text-gray-700">
              Stock Quantity:
            </label>
            <input
              type="number"
              name="stockQuantity"
              value={product.stockQuantity || ""}
              onChange={handleInputChange}
              placeholder="Stock Quantity"
              className="rm-arrow w-1/3 rounded-md border px-2 py-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-28 font-medium text-gray-700">Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="w-1/3 rounded-md border px-2 py-1"
            />
          </div>
          <button
            className="mr-2 mt-4 rounded-md bg-green-500 px-2 py-1 text-white hover:bg-green-600"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
          <button
            className="mr-2 mt-4 rounded-md bg-gray-500 px-2 py-1 text-white hover:bg-gray-600"
            onClick={() => (setEditMode(false), fetchProductByID())}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            {product.name}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="mr-2 font-medium text-gray-600">Brand:</span>
              <span className="text-gray-900">{product.brand}</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2 font-medium text-gray-600">
                Description:
              </span>
              <span className="text-gray-700">{product.description}</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2 font-medium text-gray-600">Price:</span>
              <span className="font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </span>
            </li>
            <li className="flex items-center">
              <span className="mr-2 font-medium text-gray-600">Stock:</span>
              <span
                className={`font-medium ${
                  product.stockQuantity > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.stockQuantity > 0
                  ? `${product.stockQuantity} available`
                  : "Out of stock"}
              </span>
            </li>
            <li className="flex items-center">
              <span className="mr-2 font-medium text-gray-600">
                Created Date:
              </span>
              <span className="text-sm text-gray-500">
                {new Date(
                  product.createdAt.split("-").reverse().join("-"),
                ).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </li>
            <li
              className={`text-sm font-medium ${
                product.isActive ? "text-green-500" : "text-red-500"
              }`}
            >
              {product.isActive ? "Active" : "Inactive"}
            </li>
          </ul>
          <button
            className="mr-2 mt-4 rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
          <button
            className="mt-4 rounded-md bg-red-500 px-2 py-1 text-gray-300 hover:bg-red-600 hover:text-white"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
