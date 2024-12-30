import React from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-yellow-600" />
            <span className="ml-2 text-xl font-bold text-brown-800">EduConnect</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-brown-700 hover:text-yellow-600">About Us</a>
            <a href="#how-it-works" className="text-brown-700 hover:text-yellow-600">How It Works</a>
            <a href="#faqs" className="text-brown-700 hover:text-yellow-600">FAQs</a>
            <a href="#contact" className="text-brown-700 hover:text-yellow-600">Contact Us</a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brown-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <a href="#about" className="block px-3 py-2 text-brown-700 hover:text-yellow-600">About Us</a>
            <a href="#how-it-works" className="block px-3 py-2 text-brown-700 hover:text-yellow-600">How It Works</a>
            <a href="#faqs" className="block px-3 py-2 text-brown-700 hover:text-yellow-600">FAQs</a>
            <a href="#contact" className="block px-3 py-2 text-brown-700 hover:text-yellow-600">Contact Us</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;