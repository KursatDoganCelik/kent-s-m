import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";
import PopupForm from "../components/PopUpFrom";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Product[]>(
        `${import.meta.env.VITE_MOCK_API_BASE_URL}/products`,
      );
      setProducts(response.data);
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
    fetchProducts();
  }, []);

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
    <div>
      <div className="mt-4 flex justify-between px-16">
        <h1 className="my-2 text-center text-3xl font-bold">Products</h1>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Add New Product
        </button>
        {isPopupOpen && (
          <PopupForm
            onClose={() => setIsPopupOpen(false)}
            onSuccess={fetchProducts}
          />
        )}
      </div>
      <div className="grid grid-cols-1 gap-12 px-12 py-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
