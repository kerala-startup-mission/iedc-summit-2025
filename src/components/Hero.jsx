import React from 'react';
import TextType from './TextType';

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen px-6 md:px-12 lg:px-20 py-32 md:py-40 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center overflow-hidden relative"
    >
      {/* Background Decorative Elements */}
      <div className="w-[500px] h-[500px] absolute right-[-100px] top-[-150px] bg-gradient-radial from-blue-600/12 to-transparent rounded-full" />
      <div className="w-96 h-96 absolute left-[-150px] bottom-[-70px] bg-gradient-radial from-indigo-600/10 to-transparent rounded-full" />
      <div className="w-64 h-64 absolute right-[100px] top-[216px] rounded-full border-[3px] border-blue-600/20" />
      <div className="w-36 h-36 absolute left-[192px] top-[144px] bg-blue-300/20 rounded-full" />
      <div className="w-44 h-44 absolute right-[200px] bottom-[100px] rounded-full border-2 border-blue-400/20" />

      {/* Content */}
      <div className="max-w-[1400px] w-full mx-auto relative z-10 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center px-5 py-2.5 bg-white rounded-full shadow-[0px_4px_12px_0px_rgba(37,99,235,0.15)] mb-8">
            <span className="text-blue-600 text-xs md:text-sm font-bold font-inter tracking-[0.1em] uppercase">
              10TH ANNIVERSARY EDITION
            </span>
          </div>

          {/* Main Heading with TextType */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-inter text-gray-800 leading-[1.1] mb-8">
            <TextType
              text={["IEDC SUMMIT 2025",  "Innovation Unleashed"]}
              typingSpeed={75}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
              className="text-blue-600"
              cursorClassName="text-blue-600"
            />
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold font-inter text-gray-700 leading-relaxed mb-6">
            Dare to Disrupt
          </p>

          {/* Details */}
          <p className="text-base md:text-lg font-medium font-inter text-gray-600 leading-relaxed mb-12 max-w-2xl">
            LBS College of Engineering, Kasaragod | November 2025
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button className="px-8 py-4 bg-blue-600 rounded-xl shadow-[0px_4px_15px_0px_rgba(37,99,235,0.30)] text-white text-base md:text-lg font-bold font-inter hover:bg-blue-700 hover:shadow-[0px_6px_20px_0px_rgba(37,99,235,0.40)] transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5">
              Register Now →
            </button>
            <button className="px-8 py-4 bg-white border-2 border-blue-600 rounded-xl shadow-[0px_4px_12px_0px_rgba(37,99,235,0.15)] text-blue-600 text-base md:text-lg font-bold font-inter hover:bg-blue-50 hover:shadow-[0px_6px_20px_0px_rgba(37,99,235,0.25)] transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
