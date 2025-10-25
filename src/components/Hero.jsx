import React from 'react';
import LogoLoop from './LogoLoop';

const Hero = () => {
  return (
    <div id="home" className="w-full h-[110vh] relative bg-white overflow-hidden">
      {/* Decorative Circles - Using SVG */}
      <img src="/Ellipse2.svg" alt="Decorative circle 1" className="w-1/2 absolute left-1/2 top-10 opacity-50" />
      <img src="/Ellipse3.svg" alt="Decorative circle 2" className="w-2/5 absolute right-10 top-30 " />
      <img src="/Ellipse3.svg" alt="Decorative circle 3" className="w-2/5 absolute -right-80 top-30  opacity-25" />
      <img src="/Ellipse3.svg" alt="Decorative circle 4" className="w-1/3 absolute left-130 bottom-30  opacity-25" />

      {/* Main Content Container */}
      <div className="w-1/2 left-[10%] top-[20%] absolute flex flex-col gap-4">
        {/* Title with Logo */}
        <div className="relative">
          <div className="text-blue-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold  drop-shadow-[0px_2px_19px_rgba(37,99,235,0.10)] font-clash-display">
            IEDC <br/>SUMMIT 2025<br/>
          </div>

          {/* Logo - Top Right of Title */}
          <img className="w-1/6 h-auto absolute -top-10 left-50" src="/iedc-summit-25-logo.png" alt="IEDC Badge" />

        {/* Location */}
        <div className="text-blue-400 text-2xl sm:text-3xl font-semibold font-gilroy-medium">Kasaragod</div>

        {/* Date */}
        <div className="flex items-center relative my-5">
      <img src="/Ellipse1.svg" alt="Decorative circle 1" className="w-13 h-13 absolute -top-2 left-18" />
          <div className="text-blue-500 text-3xl sm:text-4xl font-black leading-9 font-gilroy-bold relative z-10">22 Dec 2025</div>
        </div>

        {/* Register Button */}
        <a href="https://tickets.startupmission.in/iedc-summit-2025" target="_blank" rel="noopener noreferrer" className="w-1/2 h-20 bg-blue-600 rounded-[29px] flex items-center justify-center mt-10 hover:bg-blue-700 transition-colors duration-300">
          <div className="text-white text-2xl sm:text-4xl font-normal font-clash-display">REGISTER NOW</div>
        </a>

        {/* Amount */}
        <div className="flex items-baseline gap-2 mt-8">
          <div className="text-blue-400 text-3xl sm:text-4xl font-black font-gilroy-bold opacity-75 relative">
            <div className="w-16 h-1 border-t-4 border-red-600 absolute top-1/2 left-0 -skew-10" />
            999
          </div>
          <div className="text-blue-600 text-4xl sm:text-5xl font-black font-gilroy-bold">749/-</div>
        </div>
        {/* Paragraph */}
        <div className="text-blue-400 text-lg sm:text-xl font-black font-gilroy-bold">*early bird discounts available*</div>
      </div>
        </div>

      {/* Colored Blocks at Bottom - Using PNG */}
      <img 
        src="/hero-blocks.png" 
        alt="Decorative blocks" 
        className="w-full h-20 sm:h-24 absolute bottom-20 left-0 object-cover"
      />

      {/* Hero Background Image - Aligned Left and Scaled */}
      <img
        src="/hero-img.png" 
        alt="Decorative blocks"
        className="h-200 sm:h-200 md:h-200 lg:h-200 absolute bottom-20 right-4 md:right-10 object-contain"
      />

      {/* Scrolling Text Loop */}
      <div className="w-full absolute bottom-12 left-0 -skew-y-2">
        <LogoLoop
          logos={[
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
            { text: 'IEDC SUMMIT 2025' },
          ]}
          speed={80}
          direction="right"
          logoHeight={20}
          gap={40}
          pauseOnHover={true}
          className=" font-gilroy-bold bg-blue-600 py-5 text-white"
          ariaLabel="IEDC Summit 2025"
        />
      </div>
    </div>
  );
};

export default Hero;
