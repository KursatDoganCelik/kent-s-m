import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import Greetings from "./components/Greetings";

const App: React.FC = () => {
  return (
    <Router>
      <nav className="bg-gray-500 p-4">
        <ul className="flex space-x-4">
          <Link
            to="/"
            className="text-gray-300 transition duration-200 hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-gray-300 transition duration-200 hover:text-white"
          >
            Products
          </Link>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Greetings />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
};

export default App;
