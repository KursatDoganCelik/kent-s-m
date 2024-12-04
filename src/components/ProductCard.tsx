import { Product } from "../types";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-100 p-6 shadow-lg hover:shadow-xl">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="mb-4 h-52 w-full rounded-md object-cover"
      />
      <h2 className="mb-2 text-lg font-bold text-slate-800">{product.name}</h2>
      <ul className="space-y-2">
        <li className="flex items-center">
          <span className="mr-2 font-bold text-slate-600">Price:</span>
          <span className="text-blue-600">${product.price.toFixed(2)}</span>
        </li>
      </ul>
    </div>
  );
};

export default ProductCard;
