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
      setDaysLeft(Math.max(days, 0)); // Ensure it doesn't go negative
    };

    calculateDaysLeft();
    // Update once per hour. No need to update every second for a day counter.
    const timer = setInterval(calculateDaysLeft, 1000 * 60 * 60); 
    return () => clearInterval(timer);
  }, []);

  return (
    // Main container:
    // - min-h-screen ensures it's at least the viewport height.
    // - relative allows absolute positioning of children.
    // - overflow-hidden clips decorative circles.
    // - pb-XX creates a "safe area" at the bottom for the absolute-positioned blocks/image,
    //   preventing the in-flow content from overlapping them.
    <div 
      id="home" 
      className="w-full min-h-screen md:h-[110vh] relative bg-white overflow-hidden pb-28 sm:pb-32 md:pb-36 lg:pb-40"
    >
      {/* Decorative Circles (Absolute, z-0, behind content) */}
      {/* Mobile Circles - Hidden on md and up */}
      <div className="md:hidden w-64 h-64 absolute left-[-29px] top-[500px] opacity-50 rounded-full border-[0.50px] border-blue-600 animate-fade-in-up" style={{animationDelay: '0.6s'}} />
      <img src="/Ellipse3.svg" alt="" className="md:hidden w-72 h-72 absolute left-[80px] top-[350px] opacity-50 animate-fade-in-up" style={{animationDelay: '0.7s'}} />
      
      {/* Desktop Circles - Hidden on mobile */}
      <img src="/Ellipse2.svg" alt="" className="hidden md:block w-1/2 absolute left-1/2 top-10 opacity-50 animate-fade-in-up" style={{animationDelay: '0.1s'}} />
      <img src="/Ellipse3.svg" alt="" className="hidden md:block w-2/5 absolute right-10 top-20 lg:top-30 animate-fade-in-up" style={{animationDelay: '0.2s'}} />
      <img src="/Ellipse3.svg" alt="" className="hidden md:block w-2/5 absolute -right-80 top-20 lg:top-30 opacity-25 animate-fade-in-up" style={{animationDelay: '0.3s'}} />
      <img src="/Ellipse3.svg" alt="" className="hidden md:block w-1/3 absolute left-130 bottom-20 lg:bottom-30 opacity-25 animate-fade-in-up" style={{animationDelay: '0.4s'}} />

      {/* Main Content Wrapper (In-flow)
          - Mobile layout structure maintained
      */}
      <div className="relative z-10">
        {/* Mobile Layout - Hidden on md and up */}
        <div className="md:hidden w-full min-h-screen relative bg-white flex flex-col">
        
        {/* Main Content */}
        <div className="px-5 pt-12 sm:pt-16 pb-8 sm:pb-12 relative z-10 flex-1 flex flex-col justify-start">
          <h1 className="text-blue-500 text-[32px] sm:text-[36px] md:text-[42px] font-bold font-clash-display leading-tight mb-1 sm:mb-2 animate-fade-in-down">
            IEDC SUMMIT<br />2025
          </h1>
          {/* Location */}
          <div className="text-blue-400 text-base sm:text-lg md:text-xl font-semibold font-clash-display mb-1 animate-fade-in-up" style={{animationDelay: '0.1s'}}>Kasaragod</div>

          {/* Date */}
          <div className="flex items-center gap-2 relative mb-1 sm:mb-2 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="text-blue-500 text-xs sm:text-sm md:text-lg font-bold font-gilroy-bold relative z-10">22 Dec 2025</div>
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-[0.32px] border-blue-600 absolute left-[85px] sm:left-[95px] md:left-[105px]" />
          </div>

          {/* Register Button */}
          <a href="https://tickets.startupmission.in/iedc-summit-2025" target="_blank" rel="noopener noreferrer" className="w-40 sm:w-[180px] md:w-[200px] h-9 sm:h-10 md:h-11 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors mb-1 sm:mb-2 relative z-20 animate-scale-in" style={{animationDelay: '0.3s'}}>
            <div className="text-neutral-100 text-xs sm:text-sm md:text-lg font-semibold font-clash-display tracking-tight">REGISTER NOW</div>
          </a>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-1 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="relative inline-block">
              <div className="text-blue-400 text-lg sm:text-xl md:text-2xl font-gilroy-bold opacity-75">₹999</div>
              <div className="w-12 sm:w-14 md:w-16 h-0.5 border-t-[3px] border-red-600 absolute top-1/2 left-0 -translate-y-1/2 -skew-y-10" />
            </div>
            <div className="text-blue-600 text-xl sm:text-2xl md:text-3xl font-gilroy-bold">₹749/-</div>
          </div>

          {/* Early Bird */}
          <div className="text-blue-400 text-xs font-normal font-gilroy-bold animate-fade-in-up" style={{animationDelay: '0.5s'}}>*Be quick, connect more*</div>
        </div>

        {/* Hero Background Image - Mobile - On Top of Blocks */}
        <div className="absolute bottom-0 right-0 w-[55%] sm:w-[60%] md:w-[65%] max-w-52 sm:max-w-60 z-10 animate-slide-in-right" style={{animationDelay: '0.8s'}}>
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
          className="w-full h-10 sm:h-12 md:h-14 object-cover absolute bottom-0 left-0 z-5 animate-fade-in-up" style={{animationDelay: '0.9s'}}
        />

        {/* Countdown Badge - Mobile */}
        <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 left-4 sm:left-6 md:left-8">
          <div className="flex items-center gap-0">
            {/* Days - First digit */}
            <span className="text-blue-600 text-5xl sm:text-6xl md:text-8xl font-bold font-dimensions-semi-bold">{String(DaysLeft).padStart(2, '0')[0]}</span>
            {/* Days - Second digit */}
            <span className="text-blue-600 text-5xl sm:text-6xl md:text-8xl font-bold font-dimensions-semi-bold">{String(DaysLeft).padStart(2, '0')[1]}</span>
            {/* Label */}
            <div className="flex flex-col items-start justify-center ml-0 gap-0">
              <span className="text-blue-600 text-lg sm:text-2xl md:text-4xl font-bold font-dimensions-semi-bold leading-none">DAYS</span>
              <span className="text-blue-600 text-lg sm:text-2xl md:text-4xl font-dimensions-semi-bold leading-none -mt-0.5 sm:-mt-1 md:-mt-2">TO Go</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Elements (Absolutely Positioned) --- */}
      {/* These all live in the "safe zone" created by the parent's pb-XX padding */}

      {/* Scrolling Text Loop - At Blocks Level */}
      <div className="w-full -skew-y-2 absolute bottom-10 left-0 z-10 md:bottom-12 md:left-0">
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

          {/* Main Content Container */}
          <div className="w-1/2 absolute top-10 lg:top-40 left-[10%] flex flex-col gap-3 pb-40 animate-fade-in-down" style={{animationDelay: '0.5s'}}>
          {/* Title with Logo */}
          <div className="relative">
            <div className="text-blue-500 text-5xl lg:text-6xl xl:text-7xl font-semibold drop-shadow-[0px_2px_19px_rgba(37,99,235,0.10)] font-clash-display">
              IEDC <br/>SUMMIT 2025<br/>
            </div>

            {/* Logo - Top Right of Title */}
            <img className="w-16 lg:w-30 h-auto absolute -top-12 lg:-top-9 left-40 lg:left-50 animate-scale-in" style={{animationDelay: '0.6s'}} src="/iedc-summit-25-logo.png" alt="IEDC Badge" />

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
              <div className="text-blue-400 text-2xl lg:text-4xl font-black font-gilroy-bold opacity-75 relative inline-block">
                <div className="w-12 lg:w-22 h-0.5 lg:h-1 border-t-4 border-red-600 absolute top-1/2 left-0 -translate-y-1/2 -skew-9" />
                ₹999
              </div>
              <div className="text-blue-600 text-3xl lg:text-5xl font-black font-gilroy-bold">₹749/-</div>
            </div>
            {/* Paragraph */}
            <div className="text-blue-400 text-base lg:text-xl font-black font-gilroy-bold mt-2">*Be quick, connect more*</div>
          </div>
        </div>

          {/* Colored Blocks at Bottom - Using PNG */}
          <img 
            src="/hero-blocks.png" 
            alt="Decorative blocks" 
            className="w-full h-16 lg:h-24 absolute bottom-20 left-0 object-cover animate-fade-in-up" style={{animationDelay: '0.7s'}}
          />

          {/* Hero Background Image - Aligned Left and Scaled */}
          <img
            src="/hero-img.png" 
            alt="Decorative blocks"
            className="h-48 lg:h-64 xl:h-200 absolute bottom-16 lg:bottom-24 right-4 lg:right-10 object-contain animate-slide-in-right" style={{animationDelay: '0.8s'}}
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
                <span className="text-blue-600 text-xs md:text-lg lg:text-7xl font-dimensions-semi-bold leading-none -mt-3">TO Go</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
