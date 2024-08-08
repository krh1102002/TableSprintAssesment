import React from "react";
import logo from "../assets/images/logo.png";
const DashboardComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <div className="flex flex-col items-center space-y-1">
        <img src={logo} alt="TableSprint Logo" className="w-70 h-full" />
        <h1 className="text-2xl font-semibold text-gray-700">
          Welcome to TableSprint admin
        </h1>
      </div>
    </div>
  );
};

export default DashboardComponent;
