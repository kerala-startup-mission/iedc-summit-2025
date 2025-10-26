﻿import React from 'react';
import LogoLoop from './LogoLoop';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [DaysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const eventDate = new Date('2025-12-22T00:00:00').getTime();
      const today = new Date().getTime();
      const timeLeft = eventDate - today;
      const days = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
      setDaysLeft(Math.max(days, 0));
    };

    calculateDaysLeft();
    const timer = setInterval(calculateDaysLeft, 1000); // Update every sec
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="home" className="w-full h-[110vh] md:h-[110vh] relative bg-white overflow-hidden">
      {/* Mobile Layout - Hidden on md and up */}
      <div className="md:hidden w-full min-h-screen relative bg-white">
        {/* Decorative Circles for Mobile */}
        <div className="w-64 h-64 absolute left-[-29px] top-[500px] opacity-50 rounded-full border-[0.50px] border-blue-600 animate-fade-in-up" style={{animationDelay: '0.6s'}} />
        <img src="/Ellipse3.svg" alt="Decorative" className="w-72 h-72 absolute left-[80px] top-[350px] opacity-50 animate-fade-in-up" style={{animationDelay: '0.7s'}} />
        
        {/* Main Content */}
        <div className="px-5 pt-24 pb-20 relative z-10">
          <h1 className="text-blue-500 text-[42px] font-bold font-clash-display leading-11 mb-3 animate-fade-in-down">
            IEDC SUMMIT<br />2025
          </h1>
          {/* Location */}
          <div className="text-blue-400 text-xl font-semibold font-clash-display mb-2 animate-fade-in-up" style={{animationDelay: '0.1s'}}>Kasaragod</div>

          {/* Date */}
          <div className="flex items-center gap-2 relative mb-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="text-blue-500 text-lg font-bold font-gilroy-bold relative z-10">22 Dec 2025</div>
            <div className="w-6 h-6 rounded-full border-[0.32px] border-blue-600 absolute left-[105px]" />
          </div>

          {/* Register Button */}
          <a href="https://tickets.startupmission.in/iedc-summit-2025" target="_blank" rel="noopener noreferrer" className="w-[200px] h-11 rounded-xl flex items-center justify-center relative overflow-hidden group hover:shadow-lg transition-shadow mb-3 z-20 animate-scale-in" style={{backgroundImage: 'url(/hero-blocks.png)', backgroundSize: 'cover', backgroundPosition: 'center'}} animationDelay="0.3s">
            <div className="absolute inset-0 bg-blue-600 opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>
            <div className="text-neutral-100 text-lg font-semibold font-clash-display tracking-tight relative z-10">REGISTER NOW</div>
          </a>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-2 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="relative inline-block">
              <div className="text-blue-400 text-2xl font-gilroy-bold opacity-75">₹999</div>
              <div className="w-16 h-0.5 border-t-[3px] border-red-600 absolute top-1/2 left-0 -translate-y-1/2 -skew-y-10" />
            </div>
            <div className="text-blue-600 text-3xl font-gilroy-bold">₹749/-</div>
          </div>

          {/* Early Bird */}
          <div className="text-blue-400 text-sm font-normal font-gilroy-bold animate-fade-in-up" style={{animationDelay: '0.5s'}}>*Be quick, connect more*</div>
        </div>

        {/* Spacer for better separation */}
        <div className="h-32"></div>

        {/* Hero Background Image - Mobile - On Top of Blocks */}
        <div className="absolute bottom-0 right-0 w-[65%] max-w-[260px] z-10 animate-slide-in-right" style={{animationDelay: '0.8s'}}>
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
          className="w-full h-14 object-cover absolute bottom-0 left-0 z-5 animate-fade-in-up" style={{animationDelay: '0.9s'}}
        />

        {/* Countdown Badge - Mobile */}
        <div className="absolute bottom-30 left-8 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <div className="flex items-center gap-0">
            {/* Days - First digit */}
            <span className="text-blue-600 text-8xl font-bold font-dimensions-semi-bold">{String(DaysLeft).padStart(2, '0')[0]}</span>
            {/* Days - Second digit */}
            <span className="text-blue-600 text-8xl font-bold font-dimensions-semi-bold">{String(DaysLeft).padStart(2, '0')[1]}</span>
            {/* Label */}
            <div className="flex flex-col items-start justify-center ml-0 gap-0">
              <span className="text-blue-600 text-4xl font-bold font-dimensions-semi-bold leading-none">DAYS</span>
              <span className="text-blue-600 text-4xl font-dimensions-semi-bold leading-none -mt-2">TO Go</span>
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
        <img src="/Ellipse2.svg" alt="Decorative circle 1" className="w-1/2 absolute left-1/2 top-10 opacity-50 animate-fade-in-up" style={{animationDelay: '0.1s'}} />
        <img src="/Ellipse3.svg" alt="Decorative circle 2" className="w-2/5 absolute right-10 top-20 lg:top-30 animate-fade-in-up" style={{animationDelay: '0.2s'}} />
        <img src="/Ellipse3.svg" alt="Decorative circle 3" className="w-2/5 absolute -right-80 top-20 lg:top-30 opacity-25 animate-fade-in-up" style={{animationDelay: '0.3s'}} />
        <img src="/Ellipse3.svg" alt="Decorative circle 4" className="w-1/3 absolute left-130 bottom-20 lg:bottom-30 opacity-25 animate-fade-in-up" style={{animationDelay: '0.4s'}} />

        {/* Main Content Container */}
        <div className="w-1/2 absolute top-[6vh] lg:top-[13vh] xl:top-[25vh] left-[10%] flex flex-col gap-3 pb-40 animate-fade-in-down" style={{animationDelay: '0.5s'}}>
          {/* Title with Logo */}
          <div className="relative">
            <div className="text-blue-500 text-[5vh] lg:text-[6vh] xl:text-[8vh] font-semibold drop-shadow-[0px_2px_19px_rgba(37,99,235,0.10)] font-clash-display leading-15">
              IEDC <br/>SUMMIT 2025<br/>
            </div>

            {/* Logo - Top Right of Title */}
            <img className="w-[2vh] lg:w-[15vh] h-auto absolute -top-[3vh] lg:-top-[8vh] left-[8vh] lg:left-[20vh] animate-scale-in" style={{animationDelay: '0.6s'}} src="/iedc-summit-25-logo.png" alt="IEDC Badge" />

            {/* Location */}
            <div className="text-blue-400 text-[2vh] lg:text-[3vh] font-semibold font-gilroy-medium">Kasaragod</div>

            {/* Date */}
            <div className="flex items-center relative my-[0.5vh] lg:my-[1vh]">
              <img src="/Ellipse1.svg" alt="Decorative circle 1" className="w-[1.5vh] lg:w-[2vh] h-[1.5vh] lg:h-[2vh] absolute -top-[0.2vh] lg:-top-[0.5vh] left-[3vh] lg:left-[4vh]" />
              <div className="text-blue-500 text-[2.5vh] lg:text-[4vh] font-black leading-[2vh] lg:leading-[3vh] font-gilroy-bold relative z-10">22 Dec 2025</div>
            </div>

            {/* Register Button */}
            <a 
              href="https://tickets.startupmission.in/iedc-summit-2025" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 lg:px-12 py-3 lg:py-4 rounded-[29px] flex items-center justify-center mt-[2vh] lg:mt-[3vh] transition-colors duration-300 relative overflow-hidden group inline-block"
              style={{backgroundImage: 'url(/hero-blocks.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}
            >
              <div className="absolute inset-0 bg-blue-600 opacity-40 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="text-white text-[2.5vh] lg:text-[3.5vh] font-normal font-clash-display relative z-10">
                REGISTER NOW
              </div>
            </a>

            {/* Amount */}
            <div className="flex items-baseline gap-2 mt-[2vh] lg:mt-[3vh]">
              <div className="text-blue-400 text-[2.5vh] lg:text-[4vh] font-black font-gilroy-bold opacity-75 relative inline-block">
              <div className="w-full lg:w-full h-[0.5vh] lg:h-[0.7vh] border-t-4 border-red-600 absolute top-1/2 left-0 -translate-y-1/2 -skew-6" />
              ₹999
            </div>
              <div className="text-blue-600 text-[3vh] lg:text-[5vh] font-black font-gilroy-bold">₹749/-</div>
            </div>
            {/* Paragraph */}
            <div className="text-blue-400 text-[1.2vh] lg:text-xl font-black font-gilroy-bold leading-3">*Be quick, connect more*</div>
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
            className="h-[50vh] lg:h-[70vh] xl:h-[90vh] absolute bottom-[8%] right-[1%] object-contain animate-slide-in-right" style={{animationDelay: '0.8s'}}/>

        {/* Countdown Badge - Near Hero Image */}
        <div className="absolute bottom-[10vh] md:bottom-[10vh] lg:bottom-[23vh] right-[5%] lg:right-[40%] animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <div className="flex items-center gap-0 lg:gap-1">
            {/* Days - First digit */}
            <span className="text-blue-600 text-[7vh] md:text-[10vh] lg:text-[12vh] font-bold font-gilroy-bold">{String(DaysLeft).padStart(2, '0')[0]}</span>
            {/* Days - Second digit */}
            <span className="text-blue-600 text-[8vh] md:text-[12vh] lg:text-[12vh] font-bold font-gilroy-bold">{String(DaysLeft).padStart(2, '0')[1]}</span>
            {/* Label */}
            <div className="flex flex-col items-start justify-center ml-0 lg:ml-0 gap-0">
              <span className="text-blue-600 text-[1.5vh] md:text-[2vh] lg:text-[5vh] font-bold font-gilroy-bold leading-none">DAYS</span>
              <span className="text-blue-600 text-[1.2vh] md:text-[1.8vh] lg:text-[4vh] font-bold font-gilroy-bold leading-none -mt-[0.5vh]">TO Go</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;