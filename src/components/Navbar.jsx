import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [nav, setNav] = useState(false);

  const handleNav = () => setNav(!nav);

  useEffect(() => {
    fetch("https://exultantrobin.s3-tastewp.com/wp-json/wp-api-menus/v2/menus/17")
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
      <h1 className="text-3xl font-bold text-[#00df9a]">REACT12355</h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex">
        {menuItems.map((item) => (
          <li key={item.ID} className="p-4">
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button (No Icons) */}
      <button
        onClick={handleNav}
        className="block md:hidden text-3xl font-bold focus:outline-none"
      >
        {nav ? "✖️" : "☰"}
      </button>

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
