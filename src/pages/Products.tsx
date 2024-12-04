import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";
import PopupForm from "../components/PopUpFrom";
import useAxios from "../hooks/useAxios";
import { Error, Loading } from "../components/LoadingAndError";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { loading, error, get } = useAxios();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchProducts = async () => {
    const data = await get("/products");
    if (data) setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-6 p-4 lg:px-8">
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
