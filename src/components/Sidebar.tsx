import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { asideLinks } from "../config/constans/asideLinks";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

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
      className={`flex bg-slate-600 text-white transition-all duration-300 ${isOpen ? "w-56" : "w-0"}`}
    >
      <aside className="w-52 p-4 text-white">
        <button
          className={`absolute top-4 rounded-l-full bg-slate-700 p-2 transition-all duration-300 ${
            isOpen ? "left-[184px] rotate-0" : "left-[-10px] rotate-180"
          }`}
          onClick={toggleSidebar}
        >
          <ChevronLeft size={24} />
        </button>

        <h2 className="mb-6 text-xl font-bold">Sidebar</h2>
        <ul className="space-y-4">
          {asideLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.to}
                className={`flex items-center rounded p-2 text-lg transition duration-200 hover:bg-slate-700 ${
                  location.pathname === link.to ? "bg-slate-700" : ""
                }`}
              >
                <link.icon size={20} className="mr-2" />
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
