import React, {useState, useEffect} from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
const [menuItems, setMenuItems] = useState([]);
const [nav, setNav] = useState(false);

const handleNav = () => {
    setNav(!nav);
};

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
        <h1 className="text-3xl font-bold text-[#00df9a]">REACT</h1>
        <ul className="flex">
            {menuItems.map((item) => (
                <li key={item.ID} className="p-4">  
                    <a href={item.url}>{item.title}</a>
                </li>
            ))}
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
            {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
        </div>
        <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
            <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>
            {menuItems.map((item) => (
                <li key={item.ID} className='p-4 border-b border-gray-600'>  
                    <a href={item.url}>{item.title}</a>
                </li>
            ))}
        </ul>
    </div>
  )
}   

export default Navbar