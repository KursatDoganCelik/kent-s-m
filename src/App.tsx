import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "./types";
import Cards from "./components/Cards";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
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
    <div className="App">
      <h1 className="my-6 text-center text-3xl font-bold">Products</h1>
      <Cards products={products} />
    </div>
  );
};

export default App;
