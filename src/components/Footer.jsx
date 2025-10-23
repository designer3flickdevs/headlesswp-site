import React, { useState, useEffect } from "react";

const Footer = () => {
  const [menus, setMenus] = useState([]);
  const menuIds = [19, 20, 21];

  useEffect(() => {
    Promise.all(
      menuIds.map((id) =>
        fetch(`https://exultantrobin.s3-tastewp.com/wp-json/wp-api-menus/v2/menus/${id}`)
          .then((res) => res.json())
          .catch((err) => console.error(`Error fetching menu ${id}:`, err))
      )
    ).then((data) => {
      const formatted = data.map((menu) => ({
        name: menu?.name || "Menu",
        items: menu?.items || [],
      }));
      setMenus(formatted);
    });
  }, []);

  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
      {/* Left section */}
      <div>
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">REACT.</h1>
        <p className="py-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id odit ullam
          iste repellat consequatur libero reiciendis, blanditiis accusantium.
        </p>
      </div>

      {/* Menus section */}
      <div className="lg:col-span-2 flex justify-between mt-6 flex-wrap">
        {menus.map((menu, index) => (
          <div key={index}>
            <h6 className="font-medium text-gray-400">{menu.name}</h6>
            <ul>
              {menu.items.map((item) => (
                <li key={item.ID} className="py-2 text-sm">
                  <a href={item.url}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
