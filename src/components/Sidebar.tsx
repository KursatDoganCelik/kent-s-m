import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-56 bg-gray-600 p-4 text-white">
      <h2 className="mb-6 text-xl font-bold">Sidebar</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/"
            className="block rounded p-2 text-lg transition duration-200 hover:bg-gray-700"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className="block rounded p-2 text-lg transition duration-200 hover:bg-gray-700"
          >
            Products
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
