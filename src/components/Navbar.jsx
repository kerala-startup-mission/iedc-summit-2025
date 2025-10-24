import { useState, useEffect } from 'react';
import logo from '/iedc-summit-25-logo.png';
import ellipse1 from '/Ellipse1.svg';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Highlights', href: '#highlights' },
  { label: 'Gallery', href: '#gallery' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.href.substring(1),
        label: item.label
      }));

      for (let section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 0) {
            setActiveSection(section.label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 w-full h-24 items-center justify-center z-[1000]">
        {/* Logo and Navigation Links Container */}
        <div className={`flex items-center gap-8 transition-all duration-300 ${isScrolled ? 'bg-white rounded-lg px-6 py-3' : 'bg-transparent'}`}>
          {/* Logo */}
          <img 
            src={logo} 
            alt="IEDC Logo" 
            className="w-16 h-16 object-contain"
          />

          {/* Navigation Links */}
          <div className="inline-flex justify-start items-center gap-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                <a 
                  href={item.href}
                  onClick={() => setActiveSection(item.label)}
                  className="pb-px inline-flex flex-col justify-start items-start group"
                >
                  <div className={`justify-center text-blue-600 text-lg font-bold font-Gilroy leading-7 hover:opacity-100 transition-opacity ${activeSection === item.label ? 'opacity-100' : 'opacity-50'}`}>
                    {item.label}
                  </div>
                </a>
                {/* Active Indicator */}
                {activeSection === item.label && (
                  <img 
                    src={ellipse1} 
                    alt="Active indicator" 
                    className="w-8 h-8 absolute top-0 right-2"
                  />
                )}
              </div>
            ))}

            {/* Register Button */}
            <a 
              href="https://tickets.startupmission.in/iedc-summit-2025"
              className="w-40 h-10 relative bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
            >
              <div className="text-white text-lg font-semibold font-clash-display leading-6">REGISTER NOW</div>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 w-full z-[1000] p-4">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-white rounded-lg px-4 py-2' : 'bg-transparent'}`}>
          <img 
            src={logo} 
            alt="IEDC Logo" 
            className="w-16 h-16 object-contain"
          />
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-blue-600 text-2xl font-bold"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu Items */}
        {isMobileMenuOpen && (
          <div className={`mt-4 space-y-2 transition-all duration-300 ${isScrolled ? 'bg-white rounded-lg px-4 py-3' : 'bg-transparent'}`}>
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                <a
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.label);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block text-blue-600 text-lg font-bold py-2 hover:opacity-100 transition-opacity ${activeSection === item.label ? 'opacity-100' : 'opacity-50'}`}
                >
                  {item.label}
                </a>
                {/* Active Indicator */}
                {activeSection === item.label && (
                  <img 
                    src={ellipse1} 
                    alt="Active indicator" 
                    className="w-5 h-5 absolute right-0 top-1/2 transform -translate-y-1/2"
                  />
                )}
              </div>
            ))}
            <a
              href="https://tickets.startupmission.in/iedc-summit-2025"
              className="block w-full bg-blue-600 text-white text-lg font-bold py-2 text-center rounded-lg hover:bg-blue-700 transition-all duration-300 mt-4"
            >
              REGISTER NOW
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
