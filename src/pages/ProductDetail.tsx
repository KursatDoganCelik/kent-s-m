import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types";
import ProductDetailEdit from "../components/ProductDetailEdit";
import ProductDetailView from "../components/ProductDetailView";
import useAxios from "../hooks/useAxios";
import { Error, Loading } from "../components/LoadingAndError";

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
  const { get, put, del, loading, error } = useAxios();
  const [editMode, setEditMode] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fetchProductByID = async () => {
    const data = await get(`/products/${id}`);
    if (data) setProduct(data);
  };

  useEffect(() => {
    fetchProductByID();
  }, []);

  const handleDelete = async () => {
    const success = await del(`/products/${product.id}`);
    if (success) navigate("/products");
  };

  const handleUpdate = async () => {
    const placeHolderImg = "https://placehold.co/300x200?text=Placehold";
    const updatedProduct = {
      ...product,
      imageUrl: product.imageUrl || placeHolderImg,
      isActive: product.stockQuantity && product.stockQuantity > 0,
    };

    const data = await put(`/products/${product.id}`, updatedProduct);
    if (data) {
      setProduct(data);
      setEditMode(false);
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
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div key={product.id} className="rounded-xl bg-gray-100 p-6">
      {editMode ? (
        <ProductDetailEdit
          product={product}
          handleInputChange={handleInputChange}
          handleUpdate={handleUpdate}
          setEditMode={setEditMode}
          fetchProductByID={fetchProductByID}
        />
      ) : (
        <ProductDetailView
          product={product}
          setEditMode={setEditMode}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ProductDetail;
