import { Product } from "../../config/types";

type ProductDetailViewProps = {
  product: Product;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
};

const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  setEditMode,
  handleDelete,
}) => {
  return (
    <div>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="mb-4 h-56 w-fit rounded-lg object-cover"
      />
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        {product.name}
      </h2>
      <ul className="space-y-3">
        <li className="flex items-center">
          <span className="mr-2 font-medium text-gray-600">Brand:</span>
          <span className="text-gray-900">{product.brand}</span>
        </li>
        <li className="flex items-center">
          <span className="mr-2 font-medium text-gray-600">Description:</span>
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
          <span className="mr-2 font-medium text-gray-600">Created Date:</span>
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
      <div className="mt-2 flex space-x-2">
        <button
          className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
        <button
          className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductDetailView;
