import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Dummy icons, replace with your actual icon paths
import DashboardIcon from "../assets/icons/home.png";
import CategoryIcon from "../assets/icons/category.png";
import SubcategoryIcon from "../assets/icons/subcategory.png";
import ProductsIcon from "../assets/icons/products.png";

const SidebarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
    { name: "Category", icon: CategoryIcon, path: "/category" },
    { name: "Subcategory", icon: SubcategoryIcon, path: "/subcategory" },
    { name: "Products", icon: ProductsIcon, path: "/products" },
  ];

  return (
    <div className="bg-gray-100 h-full flex flex-col py-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex items-center px-4 py-2 cursor-pointer ${
              location.pathname === item.path
                ? "bg-yellow-100"
                : "hover:bg-gray-200"
            }`}
          >
            <img
              src={item.icon}
              alt={`${item.name} icon`}
              className="w-6 h-6 mr-3"
            />
            <span className="text-lg flex-grow">{item.name}</span>
            <svg
              viewBox="0 0 24 24"
              fill={
                location.pathname === item.path ? "currentColor" : "#D3D3D3"
              }
              className={`w-4 h-4 ${
                location.pathname === item.path ? "text-gray-700" : ""
              }`}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarComponent;
