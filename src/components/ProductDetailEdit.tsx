import { Product } from "../types";

type ProductDetailEditProps = {
  product: Product;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: () => void;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProductByID: () => void;
};

const ProductDetailEdit: React.FC<ProductDetailEditProps> = ({
  product,
  handleInputChange,
  handleUpdate,
  setEditMode,
  fetchProductByID,
}) => {
  return (
    <div>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="mb-4 h-56 w-fit rounded-lg object-cover"
      />
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
          <label className="w-28 font-medium text-gray-700">Description:</label>
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
    </div>
  );
};

export default ProductDetailEdit;
