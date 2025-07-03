import { Link } from 'react-router';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import logo from '../../assets/logo.jpg';
import  ModeToggle  from '@/components/mode-toggle';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 p-6 w-full z-50 transition-colors duration-300 bg-white dark:bg-gray-900 shadow">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
      
        <div className='flex items-center'>
          <img className="w-12 h-12" src={logo} alt="Logo" />
          <h2 className='font-bold text-2xl ms-2 text-blue-600'>Your<span className='text-white bg-blue-600 px-1 ms-1 rounded-tl-xl rounded-br-xl'>Book</span></h2>
        </div>

     
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-500 font-medium">Home</Link>
          <Link to="/books" className=" hover:text-blue-500 font-medium">All Books</Link>
          <Link to="/create-book" className=" hover:text-blue-500 font-medium">Add Book</Link>
          <Link to="/borrow-summary" className=" hover:text-blue-500 font-medium">Borrow Summary</Link>
        </div>

       
        <div className="flex items-center gap-4">
         
        
   <ModeToggle/>
         
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden mt-4 px-4 space-y-3">
          <Link to="/" className="block  hover:text-blue-500">Home</Link>
          <Link to="/books" className="block  hover:text-blue-500">All Books</Link>
          <Link to="/create-book" className="block  hover:text-blue-500">Add Book</Link>
          <Link to="/borrow-summary" className="block  hover:text-blue-500">Borrow Summary</Link>
        </div>
      )}
    </nav>
  );
}
