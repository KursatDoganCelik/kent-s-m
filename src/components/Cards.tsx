import React from "react";
import { CardsProps } from "../types";

const Cards: React.FC<CardsProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-12 px-12 py-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-lg border border-gray-200 p-6 shadow-lg hover:shadow-xl"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="mb-4 h-52 w-full rounded-md object-cover"
          />
          <h2 className="mb-2 text-lg font-bold text-slate-800">
            {product.name}
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="mr-2 font-bold text-slate-600">Brand:</span>
              <span className="text-gray-800">{product.brand}</span>
            </li>
            <li className="text-gray-800">{product.description}</li>
            <li className="flex items-center">
              <span className="mr-2 font-bold text-slate-600">Price:</span>
              <span className="text-blue-600">${product.price.toFixed(2)}</span>
            </li>
            <li className="flex items-center">
              <span
                className={`font-semibold ${
                  product.stockQuantity > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stockQuantity > 0
                  ? `${product.stockQuantity} available`
                  : "Out of stock"}
              </span>
            </li>
            <li className="text-gray-800">{product.createdAt}</li>
            <li
              className={`text-sm font-semibold ${
                product.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.isActive ? "Active" : "Inactive"}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Cards;
