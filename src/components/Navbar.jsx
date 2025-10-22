import { useState } from 'react';
import logo from '/iedc-summit-25-logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Highlights', href: '#highlights' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-12 z-[1000] w-full left-0">
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-600 rounded-[20px] w-[95%] max-w-full h-[70px] items-center justify-between px-12 animate-expandWidth" style={{ animationDelay: '1.5s' }}>
        {/* Logo */}
        <a href="#home" className="flex items-center animate-fadeIn" style={{ animationDelay: '1.7s' }}>
          <img 
            src={logo} 
            alt="IEDC Logo" 
            className="w-20 h-16 object-contain hover:opacity-80 transition-opacity"
          />
        </a>

        {/* Desktop Menu Items */}
        <div className="flex items-center gap-12">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white text-[18px] font-medium leading-[28px] hover:opacity-80 transition-opacity cursor-pointer animate-fadeIn"
              style={{ animationDelay: `${1.7 + index * 0.1}s` }}
            >
              {item.label}
            </a>
          ))}

          {/* Register Button */}
          <a 
            href="https://tickets.startupmission.in/iedc-summit-2025"
            className="bg-white rounded-[14px] px-6 py-2 text-blue-600 text-[18px] font-semibold leading-[24px] hover:bg-gray-100 transition-all duration-300 cursor-pointer animate-fadeIn"
            style={{ animationDelay: '2s' }}
          >
            REGISTER NOW
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-blue-600 rounded-[16px] mx-4 animate-expandWidth" style={{ animationDelay: '1.5s' }}>
        <a href="#home" className="animate-fadeIn" style={{ animationDelay: '1.7s' }}>
          <img src={logo} alt="IEDC Logo" className="w-14 h-12 object-contain" />
        </a>
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white text-2xl animate-fadeIn"
          style={{ animationDelay: '1.7s' }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Items */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-600 mt-2 mx-4 rounded-[16px] py-4 px-4 space-y-2 animate-slideDown">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-white text-lg font-medium py-2 hover:opacity-80 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://tickets.startupmission.in/iedc-summit-2025"
            className="block w-full bg-white rounded-[14px] px-4 py-2 text-blue-600 text-lg font-semibold text-center hover:bg-gray-100 transition-all duration-300 mt-4"
          >
            REGISTER NOW
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
