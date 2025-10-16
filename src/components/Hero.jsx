import React from 'react';
import TextType from './TextType';
import logo from '/iedc-summit-25-logo.png';

const Hero = () => {
  return (
    <>
      {/* Desktop Version */}
      <section
        id="home"
        className="hidden md:flex w-full h-screen px-12 py-48 relative bg-gradient-to-br from-blue-50 to-indigo-50 justify-center items-center overflow-hidden"
      >
        {/* Background Decorative Elements - Desktop */}
        <div className="w-[500px] h-[500px] left-[880px] top-[-150px] absolute bg-[radial-gradient(ellipse_70.71%_70.71%_at_50.00%_50.00%,_rgba(37,_99,_235,_0.12)_0%,_rgba(37,_99,_235,_0)_100%)] rounded-[250px]" />
        <div className="w-96 h-96 left-[-150px] top-[420px] absolute bg-[radial-gradient(ellipse_70.71%_70.71%_at_50.00%_50.00%,_rgba(99,_102,_241,_0.10)_0%,_rgba(99,_102,_241,_0)_100%)] rounded-[200px]" />
        <div className="w-64 h-64 left-[927.61px] top-[216px] absolute rounded-[125px] border-[3px] border-blue-600/20" />
        <div className="w-36 h-36 left-[192px] top-[144px] absolute bg-blue-300/20 rounded-[75px]" />
        <div className="w-44 h-44 left-[844px] top-[396px] absolute rounded-[90px] border-2 border-blue-400/20" />

        {/* Content - Desktop */}
        <div className="w-[900px] h-80 max-w-[1400px] relative">
          {/* Logo */}
          <div className="left-[48px] top-[-180px] absolute">
            <img src={logo} alt="IEDC Summit 2025 Logo" className="w-40 h-40 object-contain" />
          </div>

          <div className="px-6 py-2 left-[48px] top-0 absolute bg-white rounded-[50px] shadow-[0px_4px_12px_0px_rgba(37,99,235,0.15)] inline-flex justify-start items-start">
            <div className="justify-center text-blue-600 text-sm font-bold font-inter leading-snug tracking-wider">
              10TH ANNIVERSARY EDITION
            </div>
          </div>
          
          <div className="w-[850px] left-[48px] top-[60.75px] absolute inline-flex flex-col justify-start items-start">
            <div className="justify-center text-gray-800 text-7xl font-bold font-inter leading-[79.20px] whitespace-nowrap">
              <TextType
                text={["IEDC SUMMIT 2025", "Innovation Unleashed"]}
                typingSpeed={75}
                pauseDuration={2000}
                showCursor={true}
                cursorCharacter="|"
                className="text-blue-600"
                cursorClassName="text-blue-600"
              />
            </div>
          </div>
          
          <div className="w-[850px] max-w-[900px] left-[48px] top-[163.93px] absolute inline-flex flex-col justify-start items-start">
            <div className="justify-center text-gray-800 text-2xl font-medium font-inter leading-10">
              "Dare to Disrupt"
            </div>
          </div>
          
          <div className="w-[850px] left-[48px] top-[219.32px] absolute inline-flex flex-col justify-start items-start">
            <div className="justify-center text-gray-500 text-base font-normal font-inter leading-7">
              LBS College of Engineering, Kasaragod | 2025
            </div>
          </div>
          
          <div className="px-10 py-4 left-[48px] top-[287.46px] absolute bg-blue-600 rounded-lg shadow-[0px_4px_15px_0px_rgba(37,99,235,0.30)] inline-flex justify-start items-start hover:bg-blue-700 hover:shadow-[0px_6px_20px_0px_rgba(37,99,235,0.40)] transition-all duration-300 cursor-pointer">
            <div className="justify-center text-white text-base font-bold font-inter leading-relaxed">
              Register Now →
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Version */}
      <section
        id="home-mobile"
        className="md:hidden w-full h-screen px-5 pt-56 pb-44 relative bg-gradient-to-br from-blue-50 to-indigo-50 inline-flex justify-start items-center overflow-hidden"
      >
        {/* Background Decorative Elements - Mobile */}
        <div className="w-72 h-72 left-[228px] top-[-100px] absolute bg-[radial-gradient(ellipse_70.71%_70.71%_at_50.00%_50.00%,_rgba(37,_99,_235,_0.15)_0%,_rgba(37,_99,_235,_0)_100%)] rounded-full" />
        <div className="w-48 h-48 left-[-80px] top-[570px] absolute bg-[radial-gradient(ellipse_70.71%_70.71%_at_50.00%_50.00%,_rgba(99,_102,_241,_0.12)_0%,_rgba(99,_102,_241,_0)_100%)] rounded-[100px]" />

        {/* Content - Mobile */}
        <div className="w-full h-80 relative">
          {/* Logo */}
          <div className="left-1/2 -translate-x-1/2 top-[-170px] absolute">
            <img src={logo} alt="IEDC Summit 2025 Logo" className="w-30 h-30 object-contain" />
          </div>

          <div className="px-6 py-2 left-1/2 -translate-x-1/2 top-0 absolute bg-white rounded-[50px] shadow-[0px_4px_12px_0px_rgba(37,99,235,0.15)] inline-flex justify-center items-start whitespace-nowrap">
            <div className="text-center justify-center text-blue-600 text-xs font-bold font-inter leading-none tracking-wider">
              10TH ANNIVERSARY EDITION
            </div>
          </div>

          <div className="w-full left-0 top-[57.92px] absolute inline-flex flex-col justify-start items-center px-2">
            <div className="text-center justify-center text-gray-800 text-3xl sm:text-4xl font-bold font-inter leading-10 whitespace-nowrap">
              <TextType
                text={["IEDC SUMMIT 2025", "Innovation Unleashed"]}
                typingSpeed={75}
                pauseDuration={2000}
                showCursor={true}
                cursorCharacter="|"
                className="text-blue-600"
                cursorClassName="text-blue-600"
              />
            </div>
          </div>
          
          <div className="w-full left-0 top-[117.92px] absolute inline-flex flex-col justify-start items-center px-2">
            <div className="text-center justify-center text-gray-800 text-base font-medium font-inter leading-7 whitespace-nowrap">
              "Dare to Disrupt"
            </div>
          </div>
          
          <div className="w-full left-0 top-[186.15px] absolute inline-flex flex-col justify-start items-center px-4">
            <div className="text-center justify-center text-gray-500 text-xs sm:text-sm font-normal font-inter leading-normal whitespace-nowrap">
              LBS College of Engineering, Kasaragod | 2025
            </div>
          </div>
          
          <div className="px-6 sm:px-8 pt-3.5 pb-4 left-1/2 -translate-x-1/2 top-[267.63px] absolute bg-blue-600 rounded-lg shadow-[0px_4px_15px_0px_rgba(37,99,235,0.30)] inline-flex justify-center items-start hover:bg-blue-700 hover:shadow-[0px_6px_20px_0px_rgba(37,99,235,0.40)] transition-all duration-300 cursor-pointer whitespace-nowrap">
            <div className="text-center justify-center text-white text-sm sm:text-base font-bold font-inter leading-normal">
              Register Now →
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
