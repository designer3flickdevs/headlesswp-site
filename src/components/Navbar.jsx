import React, {useState, useEffect} from "react"

const Navbar = () => {
const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch menu from WordPress API
    fetch("http://localhost/headless_wordpress/server/wp-json/wp-api-menus/v2/menus/17")
      .then((response) => response.json())
      .then((data) => {
        // WordPress menus usually store items in `items` array
        if (data.items) {
          setMenuItems(data.items);
        }
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240] max-auto px-5 text-white">
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">REACT</h1>
        <ul className="flex">
            {menuItems.map((item) => (
                <li key={item.ID} className="p-4">  
                    <a href={item.url}>{item.title}</a>
                </li>
            ))}
        </ul>
    </div>
  )
}   

export default Navbar