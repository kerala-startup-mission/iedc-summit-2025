import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useScrollFadeInUp } from "../hooks/useScrollFadeInUp";

const Directions = () => {
  const headerRef = useScrollAnimation();
  const mapRef = useScrollAnimation({ delay: 0.3 });
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFadeInUp();

  return (
    <section id="directions" ref={sectionRef} className={`w-full py-8 md:py-16 bg-white ${
      sectionVisible ? 'fade-in-up-visible' : 'fade-in-up-hidden'
    }`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-16 lg:px-20">
        <div ref={headerRef} className="text-center mb-6 md:mb-12">
          <div className="inline-flex justify-center items-center mb-3">
            <img 
              src="/iedc-summit-25-logo.png" 
              alt="IEDC Logo" 
              className="w-14 h-14 md:w-20 md:h-20 object-contain"
            />
          </div>
          <h2 className="text-xl md:text-5xl font-normal font-clash-display text-gray-800 mb-3 px-4">
            Get Directions to the <span className="text-blue-500">Event</span>
          </h2>
          <div className="w-20 h-0.5 md:w-24 md:h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div ref={mapRef} className="w-full max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-[0px_4px_15px_0px_rgba(37,99,235,0.15)] border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3895.1816927493364!2d75.07822077573482!3d12.504113124953854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4846bda0b9525%3A0x1a6965b115fbfb96!2sLBS%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1760623210495!5m2!1sen!2sin" 
              width="100%" 
              height="300"
              className="md:h-[450px]"
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="LBS College of Engineering, Kasaragod Location"
            ></iframe>
          </div>
          
          <div className="text-center mt-6">
            <a 
              href="https://maps.app.goo.gl/Z4sA5aUp6dBwmvZ4A" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-normal font-clash-display rounded-lg transition-colors duration-300 text-sm md:text-base"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
      {/* Colored Blocks at Bottom */}
      <img 
        src="/hero-blocks.png" 
        alt="Decorative blocks" 
        className="w-full h-20 sm:h-24 mt-5 -mb-16 object-cover"
      />
    </section>
  );
};

export default Directions;
