import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '/iedc-summit-25-logo.png';
import ellipse1 from '/Ellipse1.svg';

const isBookingOpen = new Date() < new Date('2025-12-17T23:59:59+05:30');

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Speakers', href: '/speakers' },
  { label: 'Events', href: '/events' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Pre-Events', href: '/preevents' },
  { label: 'Webinars', href: '/webinars' },
  { label: 'EOIs', href: '/eois' },
  { label: isBookingOpen ? 'Train Ticket' : 'Train', href: '/train' },
];

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  // Check if we are on the home page
  const isHome = location.pathname === '/';

  // Determine if logo should be shown:
  // 1. If NOT home page -> Always show
  // 2. If IS home page -> Only show when scrolled
  const showLogo = !isHome || isScrolled;

  // Handle Scroll & Route Changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Set active based on path
    const currentItem = NAV_ITEMS.find(item => item.href === location.pathname);
    if (currentItem) setActiveSection(currentItem.label);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Helper: Handle Navigation Click
  const handleNavClick = (label, href) => {
    setActiveSection(label);
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('/')) return; // React Router handles this
    
    // Scroll to section if hash link
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 w-full h-20 items-center justify-center z-50 px-4 pointer-events-none">
        <div className={`
          pointer-events-auto flex items-center gap-6 transition-all duration-500 ease-in-out
          ${isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm rounded-2xl px-6 py-2 mt-4' 
            : 'bg-transparent py-4'}
        `}>
          
          {/* Logo - Logic applied here */}
          <div className={`transition-all duration-500 ease-in-out ${showLogo ? 'opacity-100 w-12 scale-100' : 'opacity-0 w-0 scale-90 overflow-hidden'}`}>
            <Link to="/" onClick={() => setActiveSection('Home')}>
              <img src={logo} alt="IEDC Logo" className="w-10 h-10 object-contain" />
            </Link>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <NavItem 
                key={item.label} 
                item={item} 
                isActive={activeSection === item.label} 
                onClick={() => handleNavClick(item.label, item.href)}
              />
            ))}
          </div>

          {/* Register Button */}
          <RegisterButton />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        setIsOpen={setIsMobileMenuOpen} 
        activeSection={activeSection} 
        onNavClick={handleNavClick} 
      />
    </>
  );
};

// --- Sub-components ---

const NavItem = ({ item, isActive, onClick }) => (
  <div className="relative group">
    {item.href.startsWith('/') ? (
      <Link to={item.href} onClick={onClick} className={getItemClasses(isActive)}>
        {item.label}
      </Link>
    ) : (
      <button onClick={onClick} className={getItemClasses(isActive)}>
        {item.label}
      </button>
    )}
    {isActive && (
      <img 
        src={ellipse1} 
        alt="active" 
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5" 
      />
    )}
  </div>
);

const getItemClasses = (isActive) => `
  text-sm lg:text-base font-bold font-Gilroy transition-colors duration-300
  ${isActive ? 'text-blue-600 opacity-100' : 'text-gray-600 opacity-60 hover:opacity-100 hover:text-blue-500'}
`;

const RegisterButton = ({ className = "" }) => (
  <a 
    href="https://events.snapshare.ai/in/iedcsummit" 
    target='_blank' 
    rel="noreferrer"
    className={`
      bg-blue-600 hover:bg-blue-700 text-white text-xs lg:text-sm font-bold font-clash-display
      px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5
      ${className}
    `}
  >
    VIEW PHOTOS
  </a>
);

const MobileNav = ({ isOpen, setIsOpen, activeSection, onNavClick }) => (
  <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
    <div className="flex items-center justify-between px-4 py-3">
      <Link to="/" onClick={() => onNavClick('Home', '/')}>
        <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
      </Link>
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 text-blue-600 focus:outline-none"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>
    </div>

    {/* Mobile Menu Dropdown */}
    <div className={`
      overflow-hidden transition-all duration-300 ease-in-out
      ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
    `}>
      <div className="px-4 pb-6 space-y-1">
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className="relative">
            {item.href.startsWith('/') ? (
              <Link
                to={item.href}
                onClick={() => onNavClick(item.label, item.href)}
                className={getMobileItemClasses(activeSection === item.label)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                onClick={() => onNavClick(item.label, item.href)}
                className={getMobileItemClasses(activeSection === item.label)}
              >
                {item.label}
              </button>
            )}
          </div>
        ))}
        <div className="pt-4">
          <RegisterButton className="w-full text-center block" />
        </div>
      </div>
    </div>
  </div>
);

const getMobileItemClasses = (isActive) => `
  block w-full text-left py-3 px-4 rounded-lg text-sm font-bold transition-all
  ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
`;

export default Navbar;