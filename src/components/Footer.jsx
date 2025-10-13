import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Highlights', href: '#highlights' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-gray-900 py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div className="flex flex-col gap-3 text-left">
            <h3 className="text-white text-lg font-bold font-inter">IEDC Summit 2025</h3>
            <p className="text-gray-400 text-sm font-normal font-inter leading-relaxed">
              Empowering Innovation • Fostering Entrepreneurship • Building the Future
            </p>
          </div>

          {/* Quick Links and Contact Info - Side by side on mobile */}
          <div className="grid grid-cols-2 md:contents gap-8">
            {/* Quick Links */}
            <div className="flex flex-col gap-3 text-left md:text-center">
              <h3 className="text-white text-lg font-bold font-inter">Quick Links</h3>
              <div className="flex flex-col gap-2">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const targetId = link.href.substring(1);
                      const targetElement = document.getElementById(targetId);
                      
                      if (targetElement) {
                        const navbarHeight = 80;
                        const targetPosition = targetElement.offsetTop - navbarHeight;
                        
                        window.scrollTo({
                          top: targetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="text-gray-400 text-sm font-normal font-inter hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-3 text-left md:text-right">
              <h3 className="text-white text-lg font-bold font-inter">Get In Touch</h3>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:iedcsummit2025@lbscek.ac.in"
                  className="text-gray-400 text-sm font-normal font-inter hover:text-blue-400 transition-colors"
                >
                  iedcsummit@lbscek.ac.in
                </a>
                <p className="text-gray-400 text-sm font-normal font-inter">
                  LBS College of Engineering
                </p>
                <p className="text-gray-400 text-sm font-normal font-inter">
                  Kasaragod, Kerala
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500 text-sm font-normal font-inter text-center">
            © 2025 IEDC Summit - LBS College of Engineering, Kasaragod. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
