import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [nav, setNav] = useState(false);

  const handleNav = () => setNav(!nav);

  useEffect(() => {
    // Fetch menu from WordPress API
    fetch("http://localhost/headless_wordpress/server/wp-json/wp-api-menus/v2/menus/17")
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setMenuItems(data.items);
        }
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-5 text-white">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-[#00df9a]">REACT</h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex">
        {menuItems.map((item) => (
          <li key={item.ID} className="p-4">
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Icon */}
      <div onClick={handleNav} className="block md:hidden cursor-pointer">
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>

      {/* Mobile Menu Drawer */}
      <ul
        className={`fixed top-0 left-0 w-[60%] h-full bg-[#000300] border-r border-gray-900 transition-all duration-500 ease-in-out ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="text-3xl font-bold text-[#00df9a] m-4">REACT.</h1>
        {menuItems.map((item) => (
          <li key={item.ID} className="p-4 border-b border-gray-600">
            <a href={item.url} onClick={() => setNav(false)}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
