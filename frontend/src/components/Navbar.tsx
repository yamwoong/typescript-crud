import type React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/posts" className="flex items-center space-x-2">
          <img
            src="/images/logo.png"
            alt="Pine Needles"
            className="h-12" // ✅ 네브바 높이와 맞춤
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
