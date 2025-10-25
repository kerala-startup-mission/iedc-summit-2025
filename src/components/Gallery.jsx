import React, { useState } from 'react';
import LogoLoop from './LogoLoop';
import { MdNavigateNext,  MdKeyboardArrowLeft } from 'react-icons/md';
import ellipse2 from '/Ellipse2.svg';
import ellipse3 from '/Ellipse3.svg';
import { useScrollFadeInUp } from "../hooks/useScrollFadeInUp";
const summits = [
  { year: '2024', title: 'IEDC Summit 2024', location: 'NIT Calicut', videoId: 'ZeQyHm8sfC4' },
  { year: '2023', title: 'IEDC Summit 2023', location: 'College of Engineering, Trivandrum', videoId: '6Byl5JR-IpQ' },
  { year: '2023', title: 'IEDC Summit 2023', location: 'Rajagiri School of Engineering & Technology', videoId: 'w1Fr8mSf__8' },
  { year: '2022', title: 'IEDC Summit 2022', location: "St. Joseph's College of Engineering & Technology", videoId: 'fPmUPSigxrg' },
  { year: '2021', title: 'IEDC Summit 2021', location: 'Adi Shankara Institute of Engineering and Technology, Cochin', videoId: 'zxxGtCYnhD4' },
  { year: '2019', title: 'IEDC Summit 2019', location: 'Sahrdaya College of Engineering and Technology, Thrissur', videoId: 'UqKGvZuhsCU' },
  { year: '2018', title: 'IEDC Summit 2018', location: 'Amal Jyothi Engineering College, Kanjirapally', videoId: 'jzyTX9SRTpk' },
  { year: '2017', title: 'IEDC Summit 2017', location: 'ADLUX International Convention Centre, Kochi', videoId: 'XrPAxDk_dM4' },
  { year: '2016', title: 'IEDC Summit 2016', location: 'Girideepam Convention Center, Trivandrum', videoId: 'k1wGLf7s5tA' }
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFadeInUp();

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + summits.length) % summits.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % summits.length);
  };

  const currentSummit = summits[currentIndex];

  return (
    <section id="gallery" ref={sectionRef} className={`w-full px-5 md:px-16 lg:px-20 py-16 md:py-24 bg-white relative overflow-hidden ${
      sectionVisible ? 'fade-in-up-visible' : 'fade-in-up-hidden'
    }`}>
      {/* Decorative Circles - Top Left */}
      <img src={ellipse2} alt="Ellipse 2" className="absolute w-[600px] h-[600px] -left-30 -top-20 opacity-75 pointer-events-none" />
      <img src={ellipse3} alt="Ellipse 3" className="absolute w-[450px] h-[450px] -left-10 top-0 pointer-events-none" />
      <img src={ellipse3} alt="Ellipse 3" className="absolute w-[463.57px] h-[463.57px] -left-12 -top-24 opacity-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Section Header */}
        <div className="w-full flex flex-col items-start gap-4 text-left relative z-20">
          <h2 className="text-blue-500 text-6xl md:text-7xl font-light font-clash-display leading-tight">
            Previous Summits
          </h2>
        </div>

        {/* Large Video Display */}
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden mb-12 shadow-lg">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${currentSummit.videoId}`}
            title={currentSummit.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Carousel Controller - Below Video */}
        <div className="w-full lg:w-[860px] relative bottom-20 h-32 md:h-44 bg-white rounded-2xl border-3 border-blue-600 overflow-hidden flex items-center px-4 md:px-8 mx-auto mb-10">
          {/* Left Arrow */}
          <button 
            onClick={goToPrevious}
            className="w-9 md:w-11 h-24 md:h-32 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300 flex-shrink-0"
          >
            <MdKeyboardArrowLeft className="w-8 md:w-10 h-16 md:h-20 text-white" />
          </button>
          

          <div className="flex items-center justify-start h-full gap-2 md:gap-2.5 px-3 md:px-5 flex-grow">
            {/* Video Thumbnail - Hidden on Mobile */}
            <div className="hidden md:flex w-60 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-slate-900 items-center justify-center">
              <img 
                src={`https://img.youtube.com/vi/${currentSummit.videoId}/0.jpg`}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Summit Info */}
            <div className="flex-grow flex flex-col justify-center">
              <h3 className="text-slate-900 text-sm md:text-lg font-bold font-gilroy-bold leading-snug">
                {currentSummit.title}
              </h3>
              <p className="text-slate-600 font-clash-display text-xs md:text-sm mt-1">
                {currentSummit.location}
              </p>
            </div>

            {/* Year Badge - Hidden on Mobile */}
            <div className="hidden md:flex w-36 h-32 items-center justify-center bg-zinc-100 rounded-lg flex-shrink-0">
              <span className="text-slate-900 text-3xl font-light font-gilroy-light">
                {currentSummit.year}
              </span>
            </div>

            {/* Spacers - Hidden on Mobile */}
            <div className="hidden md:block w-20 h-32 bg-zinc-300 rounded-lg flex-shrink-0" />
          </div>

          {/* Right Arrow */}
          <button 
            onClick={goToNext}
            className="w-9 md:w-11 h-24 md:h-32 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300 flex-shrink-0"
          >
            <MdNavigateNext className="w-8 md:w-10 h-16 md:h-20 text-white" />
          </button>
        </div>  
      </div>
        {/* Colored Blocks at Bottom - Using PNG */}
              <img 
                src="/hero-blocks.png" 
                alt="Decorative blocks" 
                className="w-full h-20 sm:h-24 absolute bottom-20 left-0 object-cover"
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
    </section>
  );
};

export default Gallery;
