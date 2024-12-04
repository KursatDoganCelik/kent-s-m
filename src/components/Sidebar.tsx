import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Home, ShoppingBag } from "lucide-react";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`flex transition-all duration-300 ${
        isOpen ? "w-56" : "w-0"
      } bg-gray-600 text-white`}
    >
      <aside className="w-52 bg-gray-600 p-4 text-white">
        <button
          className={`absolute top-4 rounded-l-full bg-gray-700 p-2 transition-all duration-300 ${
            isOpen ? "left-[184px] rotate-0" : "left-[-10px] rotate-180"
          }`}
          onClick={toggleSidebar}
        >
          <ChevronLeft size={24} />
        </button>

        <h2 className="mb-6 text-xl font-bold">Sidebar</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="flex items-center rounded p-2 text-lg transition duration-200 hover:bg-gray-700"
            >
              <Home size={20} className="mr-2" />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="flex items-center rounded p-2 text-lg transition duration-200 hover:bg-gray-700"
            >
              <ShoppingBag size={20} className="mr-2" />
              Products
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
