import React from 'react';
import LogoLoop from './LogoLoop';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [DaysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const eventDate = new Date('2025-12-22').getTime();
      const today = new Date().getTime();
      const timeLeft = eventDate - today;
      const days = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
      setDaysLeft(Math.max(days, 0));
    };

    calculateDaysLeft();
    const timer = setInterval(calculateDaysLeft, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="home" className="w-full h-[110vh] md:h-[110vh] relative bg-white overflow-hidden">
      {/* Mobile Layout - Hidden on md and up */}
      <div className="md:hidden w-full min-h-screen relative bg-white">
        {/* Decorative Circles for Mobile */}
        <div className="w-64 h-64 absolute left-[-29px] top-[500px] opacity-50 rounded-full border-[0.50px] border-blue-600" />
        <img src="/Ellipse3.svg" alt="Decorative" className="w-72 h-72 absolute left-[80px] top-[350px] opacity-50" />
        
        {/* Main Content */}
        <div className="px-5 pt-24 pb-20 relative z-10">
          <h1 className="text-blue-500 text-[42px] font-bold font-clash-display leading-11 mb-3">
            IEDC SUMMIT<br />2025
          </h1>
          {/* Location */}
          <div className="text-blue-400 text-xl font-semibold font-clash-display mb-2">Kasaragod</div>

          {/* Date */}
          <div className="flex items-center gap-2 relative mb-4">
            <div className="text-blue-500 text-lg font-bold font-gilroy-bold relative z-10">22 Dec 2025</div>
            <div className="w-6 h-6 rounded-full border-[0.32px] border-blue-600 absolute left-[105px]" />
          </div>

          {/* Register Button */}
          <a href="https://tickets.startupmission.in/iedc-summit-2025" target="_blank" rel="noopener noreferrer" className="w-[200px] h-11 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors mb-3 relative z-20">
            <div className="text-neutral-100 text-lg font-semibold font-clash-display tracking-tight">REGISTER NOW</div>
          </a>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-2">
            <div className="relative">
              <div className="text-blue-400 text-2xl font-gilroy-bold opacity-75">999</div>
              <div className="w-12 h-0.5 border-t-[3px] border-red-600 absolute top-1/2 left-0 -skew-x-12" />
            </div>
            <div className="text-blue-600 text-3xl font-gilroy-bold">749/-</div>
          </div>

          {/* Early Bird */}
          <div className="text-blue-400 text-sm font-normal font-gilroy-bold">*early bird discounts available*</div>
        </div>

        {/* Spacer for better separation */}
        <div className="h-32"></div>

        {/* Hero Background Image - Mobile - On Top of Blocks */}
        <div className="absolute bottom-0 right-0 w-[65%] max-w-[260px] z-10">
          <img
            src="/hero-img.png" 
            alt="Decorative image"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Colored Blocks at Bottom */}
        <img 
          src="/hero-blocks.png" 
          alt="Decorative blocks" 
          className="w-full h-14 object-cover absolute bottom-0 left-0 z-5"
        />

        {/* Countdown Badge - Mobile */}
        <div className="absolute bottom-30 left-8">
          <div className="flex items-center gap-0">
            {/* Days - First digit */}
            <span className="text-blue-600 text-8xl font-bold font-dimensions-semi-bold">{String(DaysLeft).padStart(2, '0')[0]}</span>
            {/* Days - Second digit */}
            <span className="text-blue-600 text-8xl font-bold font-dimensions-semi-bold">{String(DaysLeft).padStart(2, '0')[1]}</span>
            {/* Label */}
            <div className="flex flex-col items-start justify-center ml-0 gap-0">
              <span className="text-blue-600 text-4xl font-bold font-dimensions-semi-bold leading-none">DAYS</span>
              <span className="text-blue-600 text-4xl font-dimensions-semi-bold leading-none -mt-2">TO GO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Text Loop - At Blocks Level */}
      <div className="w-full -skew-y-2 absolute bottom-10 left-0 z-10 md:absolute md:bottom-12 md:left-0">
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

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden md:block w-full min-h-screen lg:h-[110vh] relative">
        {/* Decorative Circles - Using SVG */}
        <img src="/Ellipse2.svg" alt="Decorative circle 1" className="w-1/2 absolute left-1/2 top-10 opacity-50" />
        <img src="/Ellipse3.svg" alt="Decorative circle 2" className="w-2/5 absolute right-10 top-20 lg:top-30" />
        <img src="/Ellipse3.svg" alt="Decorative circle 3" className="w-2/5 absolute -right-80 top-20 lg:top-30 opacity-25" />
        <img src="/Ellipse3.svg" alt="Decorative circle 4" className="w-1/3 absolute left-130 bottom-20 lg:bottom-30 opacity-25" />

        {/* Main Content Container */}
        <div className="w-1/2 absolute top-10 lg:top-40 left-[10%] flex flex-col gap-3 pb-40">
          {/* Title with Logo */}
          <div className="relative">
            <div className="text-blue-500 text-5xl lg:text-6xl xl:text-7xl font-semibold drop-shadow-[0px_2px_19px_rgba(37,99,235,0.10)] font-clash-display">
              IEDC <br/>SUMMIT 2025<br/>
            </div>

            {/* Logo - Top Right of Title */}
            <img className="w-16 lg:w-30 h-auto absolute -top-12 lg:-top-9 left-40 lg:left-50" src="/iedc-summit-25-logo.png" alt="IEDC Badge" />

            {/* Location */}
            <div className="text-blue-400 text-xl lg:text-3xl font-semibold font-gilroy-medium">Kasaragod</div>

            {/* Date */}
            <div className="flex items-center relative my-3 lg:my-5">
              <img src="/Ellipse1.svg" alt="Decorative circle 1" className="w-10 lg:w-13 h-10 lg:h-13 absolute -top-1 lg:-top-2 left-16 lg:left-18" />
              <div className="text-blue-500 text-2xl lg:text-4xl font-black leading-8 lg:leading-9 font-gilroy-bold relative z-10">22 Dec 2025</div>
            </div>

            {/* Register Button */}
            <a href="https://tickets.startupmission.in/iedc-summit-2025" target="_blank" rel="noopener noreferrer" className="w-1/2 h-16 lg:h-20 bg-blue-600 rounded-[29px] flex items-center justify-center mt-6 lg:mt-10 hover:bg-blue-700 transition-colors duration-300">
              <div className="text-white text-2xl lg:text-4xl font-normal font-clash-display">REGISTER NOW</div>
            </a>

            {/* Amount */}
            <div className="flex items-baseline gap-2 mt-5 lg:mt-8">
              <div className="text-blue-400 text-2xl lg:text-4xl font-black font-gilroy-bold opacity-75 relative">
                <div className="w-12 lg:w-16 h-0.5 lg:h-1 border-t-4 border-red-600 absolute top-1/2 left-0 -skew-10" />
                999
              </div>
              <div className="text-blue-600 text-3xl lg:text-5xl font-black font-gilroy-bold">749/-</div>
            </div>
            {/* Paragraph */}
            <div className="text-blue-400 text-base lg:text-xl font-black font-gilroy-bold mt-2">*early bird discounts available*</div>
          </div>
        </div>

        {/* Colored Blocks at Bottom - Using PNG */}
        <img 
          src="/hero-blocks.png" 
          alt="Decorative blocks" 
          className="w-full h-16 lg:h-24 absolute bottom-20 left-0 object-cover"
        />

        {/* Hero Background Image - Aligned Left and Scaled */}
        <img
          src="/hero-img.png" 
          alt="Decorative blocks"
          className="h-48 lg:h-64 xl:h-200 absolute bottom-16 lg:bottom-24 right-4 lg:right-10 object-contain"
        />

        {/* Countdown Badge - Near Hero Image */}
        <div className="absolute bottom-60 md:bottom-60 lg:bottom-60 right-150 lg:right-150">
          <div className="flex items-center gap-0 lg:gap-1">
            {/* Days - First digit */}
            <span className="text-blue-600 text-6xl md:text-9xl lg:text-[200px] font-bold font-dimensions-semi-bold">{String(DaysLeft).padStart(2, '0')[0]}</span>
            {/* Days - Second digit */}
            <span className="text-blue-600 text-6xl md:text-9xl lg:text-[200px] font-bold font-dimensions-semi-bold">{String(DaysLeft).padStart(2, '0')[1]}</span>
            {/* Label */}
            <div className="flex flex-col items-start justify-center ml-0 lg:ml-0 gap-0">
              <span className="text-blue-600 text-sm md:text-xl lg:text-7xl font-bold font-dimensions-semi-bold leading-none">DAYS</span>
              <span className="text-blue-600 text-xs md:text-lg lg:text-7xl font-dimensions-semi-bold leading-none -mt-3">TO GO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
