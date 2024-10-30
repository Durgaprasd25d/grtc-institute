import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="relative w-24 h-24 border-4 border-transparent rounded-full animate-spin shadow-lg">
        <div className="absolute inset-0 border-4 border-t-blue-400 rounded-full border-opacity-50 animate-spin" />
        <div className="absolute inset-0 border-4 border-transparent rounded-full animate-spin border-t-teal-400" />
      </div>
      <div className="text-gray-700 text-lg mt-4"></div>
    </div>
  );
};

export default Loader;