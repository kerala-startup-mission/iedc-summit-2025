import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="contact" className="w-full">
      
      {/* --- App Download Section (Commented out until development is complete) --- */}
      {/* <section className="px-5 py-20 bg-gray-900 bg-[url('/hero-blocks.png')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="container mx-auto text-center z-10 relative">
          <div className="mb-10">
            <p className="text-3xl md:text-5xl font-clash-display text-yellow-400 mb-4">
              Join us for a powerpacked conference
            </p>
            <h1 className="mb-2 text-xl font-bold text-white font-gilroy-light uppercase tracking-widest">
              Download Now
            </h1>
            <h1 className="mb-3 text-3xl md:text-4xl font-black text-blue-500 font-clash-display">
              IEDC Summit App
            </h1>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer"
              className="transition-transform hover:scale-105"
            >
              <img 
                src="/appstore.png" 
                alt="Download on App Store" 
                className="w-36 border border-white/20 rounded-lg shadow-2xl"
              />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer"
              className="transition-transform hover:scale-105"
            >
              <img 
                src="/playstore.png" 
                alt="Get it on Google Play" 
                className="w-36 border border-white/20 rounded-lg shadow-2xl"
              />
            </a>
          </div>
        </div>
      </section> 
      */}

      {/* 2. Contact & Partners Section */}
      <section className="px-5 py-16 bg-black text-white border-b border-gray-800">
        <div className="container mx-auto flex flex-col items-center justify-center gap-10">
          
          {/* Partner Logos Row (Minimal) */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
             <img src="/ksum-logo.png" alt="KSUM" className="h-10 md:h-13 object-contain" />
             <img src="/iedc-logo.png" alt="IEDC" className="h-10 md:h-13 object-contain" />
             <div className="h-8 w-px bg-gray-700 hidden md:block"></div>
             <img src="/lbscek-logo.png" alt="LBSCEK" className="h-8 md:h-8 object-contain" />
             <img src="/cuk-logo.svg" alt="CUK" className="h-10 md:h-12 object-contain" />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center text-center space-y-4">
            <img src="/iedc-summit-25-logo.png" alt="IEDC Summit Logo" className="w-24 md:w-32 object-contain mb-2" />
            
            <div>
              <p className="text-gray-400 text-sm font-gilroy-light mb-1">For details mail to</p>
              <a 
                href="mailto:iedcsummit@lbscek.ac.in" 
                className="text-lg md:text-xl font-bold hover:text-blue-500 transition-colors font-clash-display"
              >
                iedcsummit@lbscek.ac.in
              </a>
            </div>
            
            <div className="text-sm text-gray-500 font-gilroy-light mt-4">
              <p>L.B.S. College of Engineering, Kasaragod</p>
              <p>Central University of Kerala, Kasaragod</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Social & Copyright Section */}
      <section className="p-8 bg-[#111] text-white flex flex-col items-center gap-8 text-sm font-gilroy-light">
        
        <div className="flex flex-wrap justify-center gap-10 md:gap-20">
          {/* KSUM */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">KSUM</span>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/kerala-startup-mission/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/keralastartupmission/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* IEDC Kerala */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">IEDC Kerala</span>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/iedckerala/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/iedckerala/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* IEDC LBSCEK */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">IEDC LBSCEK</span>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/iedc-lbscek/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/lbsiedc/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* IEDC CUK */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">IEDC CUK</span>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/iedc-cuk-56b73b259/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/iedc_cuk/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm mb-6">
            <a href="/leaderboard" className="text-gray-500 hover:text-blue-400 transition-colors font-gilroy-light font-semibold">Leaderboard</a>
            <a href="/accomodation" className="text-gray-500 hover:text-blue-400 transition-colors font-gilroy-light font-semibold">Accommodation</a>
            <a href="/Tender_IEDC_Summit_2025.pdf" download="Tender_IEDC_Summit_2025.pdf" className="text-gray-500 hover:text-blue-400 transition-colors font-gilroy-light font-semibold">Tender Form</a>
            <a target="_blank" href="https://policy.ksum.in/privacy_policy.html" className="text-gray-500 hover:text-blue-400 transition-colors font-gilroy-light">Privacy Policy</a>
            <a target="_blank" href="https://policy.ksum.in/terms.html" className="text-gray-500 hover:text-blue-400 transition-colors font-gilroy-light">Terms &amp; Conditions</a>
            <a target="_blank" href="https://policy.ksum.in/refund_policy.html" className="text-gray-500 hover:text-blue-400 transition-colors font-gilroy-light">Refund Policy</a>
          </div>
          {/* Copyright */}
          <div className="text-gray-500 text-center">
            Copyright © 2025 Kerala Startup Mission. All Rights Reserved.
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;