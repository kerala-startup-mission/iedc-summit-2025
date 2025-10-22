import React from 'react';
import designImage from '/iedc-design.png';
import './Hero.css';

const Hero = () => {
  return (
    <div id="home" className="w-full h-screen relative bg-white overflow-hidden">
      {/* Background Image - Full Width, at bottom */}
      <img 
        src={designImage} 
        alt="design" 
        className="absolute bottom-0 left-0 w-full h-auto object-cover pointer-events-none z-30 animate-slideUp"
      />

        {/* Gradient Overlay */}
        <div className="absolute top-[445px] left-0 w-full h-[699px] bg-gradient-to-b from-transparent from-[3.37%] to-[#f5f5f5] to-[77.4%] pointer-events-none z-30 animate-slideUp" />

        {/* 10th Anniversary Badge */}
        <div className="absolute top-[150px] left-1/2 -translate-x-1/2 text-[16px] font-bold tracking-[1px] leading-[26px] text-gray-600 whitespace-nowrap z-40 animate-fadeInDown" style={{ animationDelay: '0.5s' }}>
          10TH ANNIVERSARY EDITION
        </div>

        {/* Main Heading */}
        <div className="absolute top-[170px] left-1/2 -translate-x-1/2 text-center w-full z-10 animate-fadeInDown" style={{ animationDelay: '0.7s' }}>
          <h1 className="text-[150px] font-bold leading-[140px] bg-gradient-to-b from-[#378aff] to-[#eceeff] bg-clip-text text-transparent drop-shadow-[0px_4.615px_46.15px_rgba(37,99,235,0.1)]">
            IEDC SUMMIT
          </h1>
        </div>

        {/* Year "2025" */}
        <div className="absolute top-[300px] left-1/2 -translate-x-1/2 text-[48px] font-medium leading-[62px] text-[#c2c8ff] z-40 animate-fadeInDown" style={{ animationDelay: '0.9s' }}>
          2025
        </div>

        {/* Register Button - Bottom Center */}
        <a 
          href="https://tickets.startupmission.in/iedc-summit-2025"
          className="absolute bottom-[52px] left-1/2 -translate-x-1/2 bg-blue-600 rounded-[18px] px-8 py-3 flex items-center justify-center text-white text-[22px] font-semibold leading-[30px] hover:bg-blue-700 transition-all duration-300 cursor-pointer z-40 animate-fadeInUp" style={{ animationDelay: '1.1s' }}
        >
          REGISTER NOW
        </a>


        {/* Description Text */}
        <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 text-center max-w-[700px] text-[16px] leading-[22px] font-light text-black px-4 z-40 animate-fadeInUp" style={{ animationDelay: '1.1s' }}>
          Asia's largest summit for aspiring entrepreneurs, organised by KSUM @ LBSCE Kasaragod
        </div>
    </div>
  );
};

export default Hero;
