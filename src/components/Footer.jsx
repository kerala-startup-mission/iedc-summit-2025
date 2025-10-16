import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
        
        {/* Partner Logos - Desktop */}
        <div className="hidden md:grid grid-cols-2 gap-8 mb-12">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <img 
                src="/ksum-logo.png" 
                alt="Kerala Startup Mission" 
                className="h-28 object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex items-center justify-center">
              <img 
                src="/iedc-logo.png" 
                alt="IEDC Kerala" 
                className="h-24 object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <img 
                src="/iedc-lbs-logo.png" 
                alt="IEDC LBSCEK" 
                className="h-24 object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex items-center justify-center">
              <img 
                src="/lbscek-logo.png" 
                alt="LBS College of Engineering" 
                className="h-24 object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        <hr className="hidden md:block border-gray-800 mb-8" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Left Column - Kerala Startup Mission */}
          <div className="space-y-6">
            {/* Mobile Logos - KSUM & State */}
            <div className="grid grid-cols-2 gap-4 md:hidden mb-6">
              <div className="flex items-center justify-center bg-white/5 rounded-lg p-4">
                <img 
                  src="/ksum-logo.png" 
                  alt="Kerala Startup Mission" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="flex items-center justify-center bg-white/5 rounded-lg p-4">
                <img 
                  src="/iedc-logo.png" 
                  alt="IEDC Kerala" 
                  className="h-16 object-contain"
                />
              </div>
            </div>

            <div className="text-gray-300">
              <p className="font-bold text-white mb-2">Kerala Startup Mission | Government of Kerala</p>
              <p className="text-sm">G3B, Thejaswini, Technopark Campus</p>
              <p className="text-sm">Kariyavattom, Trivandrum, Kerala 695581</p>
            </div>

            <div className="text-gray-300">
              <p className="font-bold text-white mb-2">For Queries</p>
              <a 
                href="mailto:iedckerala@startupmission.in" 
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                iedckerala@startupmission.in
              </a>
            </div>

            <div className="text-gray-300">
              <p className="font-bold text-white mb-2">Adarsh V</p>
              <a 
                href="mailto:iedckerala@startupmission.in" 
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors block"
              >
                iedckerala@startupmission.in
              </a>
              <a 
                href="tel:+918921148007" 
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                +91 89211 48007
              </a>
            </div>

            {/* Social Media - KSUM */}
            <div>
              <ul className="flex gap-4">
                <li>
                  <a 
                    href="https://www.facebook.com/keralastartupmission/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaFacebookF className="text-white" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://x.com/startup_mission" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaTwitter className="text-white" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.instagram.com/keralastartupmission/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-pink-500 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaInstagram className="text-white" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/company/kerala-startup-mission/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaLinkedin className="text-white" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - IEDC LBSCEK */}
          <div className="space-y-6">
            {/* Mobile Logos - IEDC LBSCEK & LBSCEK */}
            <div className="grid grid-cols-2 gap-4 md:hidden mb-6">
              <div className="flex items-center justify-center bg-white/5 rounded-lg p-4">
                <img 
                  src="/iedc-lbs-logo.png" 
                  alt="IEDC LBSCEK" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="flex items-center justify-center bg-white/5 rounded-lg p-4">
                <img 
                  src="/lbscek-logo.png" 
                  alt="LBS College of Engineering" 
                  className="h-16 object-contain"
                />
              </div>
            </div>

            <div className="text-gray-300">
              <p className="font-bold text-white mb-2">
                Innovation and Entrepreneurship Development Centre<br />LBS College of Engineering
              </p>
              <p className="text-sm">L.B.S. College of Engineering,</p>
              <p className="text-sm">Kasaragod, Kerala 671542</p>
            </div>

            <div className="text-gray-300">
              <p className="font-bold text-white mb-2">For Queries</p>
              <a 
                href="mailto:iedcsummit@lbscek.ac.in" 
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                iedcsummit@lbscek.ac.in
              </a>
            </div>

            <div className="text-gray-300">
              <p className="font-bold text-white mb-2">IEDC LBSCEK</p>
              <a 
                href="mailto:iedc@lbscek.ac.in" 
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors block"
              >
                iedc@lbscek.ac.in
              </a>
              <div className="text-sm">
                <a 
                  href="tel:+919946760222" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  +91 99467 60222
                </a>
              </div>
            </div>

            {/* Social Media - IEDC LBSCEK */}
            <div>
              <ul className="flex gap-4">
                <li>
                  <a 
                    href="https://www.facebook.com/iedclbs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaFacebookF className="text-white" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://x.com/lbsiedc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaTwitter className="text-white" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.instagram.com/lbsiedc/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-pink-500 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaInstagram className="text-white" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/company/iedc-lbscek/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaLinkedin className="text-white" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Kerala Startup Mission. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
