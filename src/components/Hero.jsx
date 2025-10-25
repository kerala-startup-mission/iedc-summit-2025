import React from 'react';
import LogoLoop from './LogoLoop';

const Hero = () => {
  return (
    <div id="home" className="w-full min-h-screen md:h-[110vh] relative bg-white overflow-hidden">
      {/* Mobile Layout - Hidden on md and up */}
      <div className="md:hidden w-full h-full relative">
        {/* Decorative Circles for Mobile */}
        <div className="w-64 h-64 left-[-29px] top-[688px] absolute opacity-50 rounded-full border-[0.50px] border-blue-600" />
        <img src="/Ellipse3.svg" alt="Decorative" className="w-80 h-80 left-[102px] top-[428px] absolute opacity-50" />

        {/* Logo */}
        <img className="w-16 h-16 left-[15px] top-[18px] absolute" src="/iedc-summit-25-logo.png" alt="IEDC Badge" />
        
        {/* Menu Button */}
        <div className="left-[369px] top-[31px] absolute justify-center text-blue-600 text-xl font-normal font-gilroy-bold leading-8">Menu</div>
        <div className="w-9 h-9 left-[376px] top-[30px] absolute rounded-full border-[0.38px] border-blue-600" />

        {/* Main Content */}
        <div className="left-[59px] top-[153px] absolute justify-center text-blue-500 text-5xl font-normal font-clash-display leading-10">
          IEDC SUMMIT <br/>2025<br/>
        </div>

        {/* Location */}
        <div className="w-32 left-[59px] top-[253px] absolute justify-center text-blue-400 text-2xl font-normal font-clash-display leading-5">Kasaragod</div>

        {/* Date */}
        <div className="w-44 h-10 left-[59px] top-[275px] absolute inline-flex justify-start items-center gap-6">
          <div className="w-8 h-8 rounded-full border-[0.32px] border-blue-600" />
          <div className="justify-center text-blue-500 text-2xl font-normal font-gilroy-bold leading-6">22 Dec 2025</div>
        </div>

        {/* Pricing */}
        <div className="left-[60px] top-[401px] absolute opacity-75 justify-center text-blue-400 text-3xl font-normal font-gilroy-black leading-10">999</div>
        <div className="left-[120px] top-[392px] absolute justify-center text-blue-600 text-4xl font-normal font-gilroy-black leading-[55px]">749/-</div>
        <div className="w-14 h-4 left-[59px] top-[414px] absolute opacity-75 outline-2 outline-offset-[-1px] outline-red-600" />

        {/* Early Bird */}
        <div className="left-[59px] top-[438px] absolute justify-center text-blue-400 text-lg font-normal font-gilroy-black leading-6">*early bird discounts available*</div>

        {/* Register Button */}
        <a href="https://tickets.startupmission.in/iedc-summit-2025" target="_blank" rel="noopener noreferrer" className="w-56 h-12 left-[59px] top-[324px] absolute bg-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-colors">
          <div className="text-neutral-100 text-2xl font-medium font-clash-display leading-8 tracking-tight">REGISTER NOW</div>
        </a>

        {/* Colored Blocks at Bottom */}
        <img 
          src="/hero-blocks.png" 
          alt="Decorative blocks" 
          className="w-full h-16 left-0 top-[884px] absolute object-cover"
        />
      </div>

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden md:block w-full h-full">
        {/* Decorative Circles - Using SVG */}
        <img src="/Ellipse2.svg" alt="Decorative circle 1" className="w-1/2 absolute left-1/2 top-10 opacity-50" />
        <img src="/Ellipse3.svg" alt="Decorative circle 2" className="w-2/5 absolute right-10 top-30 " />
        <img src="/Ellipse3.svg" alt="Decorative circle 3" className="w-2/5 absolute -right-80 top-30  opacity-25" />
        <img src="/Ellipse3.svg" alt="Decorative circle 4" className="w-1/3 absolute left-130 bottom-30  opacity-25" />

        {/* Main Content Container */}
        <div className="w-1/2 left-[10%] top-[20%] absolute flex flex-col gap-4">
          {/* Title with Logo */}
          <div className="relative">
            <div className="text-blue-500 text-6xl lg:text-7xl font-semibold drop-shadow-[0px_2px_19px_rgba(37,99,235,0.10)] font-clash-display">
              IEDC <br/>SUMMIT 2025<br/>
            </div>

            {/* Logo - Top Right of Title */}
            <img className="w-1/6 h-auto absolute -top-12 left-50" src="/iedc-summit-25-logo.png" alt="IEDC Badge" />

            {/* Location */}
            <div className="text-blue-400 text-3xl font-semibold font-gilroy-medium">Kasaragod</div>

            {/* Date */}
            <div className="flex items-center relative my-5">
              <img src="/Ellipse1.svg" alt="Decorative circle 1" className="w-13 h-13 absolute -top-2 left-18" />
              <div className="text-blue-500 text-4xl font-black leading-9 font-gilroy-bold relative z-10">22 Dec 2025</div>
            </div>

            {/* Register Button */}
            <a href="https://tickets.startupmission.in/iedc-summit-2025" target="_blank" rel="noopener noreferrer" className="w-1/2 h-20 bg-blue-600 rounded-[29px] flex items-center justify-center mt-10 hover:bg-blue-700 transition-colors duration-300">
              <div className="text-white text-4xl font-normal font-clash-display">REGISTER NOW</div>
            </a>

            {/* Amount */}
            <div className="flex items-baseline gap-2 mt-8">
              <div className="text-blue-400 text-4xl font-black font-gilroy-bold opacity-75 relative">
                <div className="w-16 h-1 border-t-4 border-red-600 absolute top-1/2 left-0 -skew-10" />
                999
              </div>
              <div className="text-blue-600 text-5xl font-black font-gilroy-bold">749/-</div>
            </div>
            {/* Paragraph */}
            <div className="text-blue-400 text-xl font-black font-gilroy-bold">*early bird discounts available*</div>
          </div>
        </div>

        {/* Colored Blocks at Bottom - Using PNG */}
        <img 
          src="/hero-blocks.png" 
          alt="Decorative blocks" 
          className="w-full h-24 absolute bottom-20 left-0 object-cover"
        />

        {/* Hero Background Image - Aligned Left and Scaled */}
        <img
          src="/hero-img.png" 
          alt="Decorative blocks"
          className="h-200 absolute bottom-20 right-10 object-contain"
        />
      </div>

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
          className="font-gilroy-bold bg-blue-600 py-5 text-white"
          ariaLabel="IEDC Summit 2025"
        />
      </div>
    </div>
  );
};

export default Hero;
