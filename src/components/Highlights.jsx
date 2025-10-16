import React from 'react';
import TiltedCard from './TiltedCard';
import useScrollAnimation from '../hooks/useScrollAnimation';

// --- Icons are now imported from the react-icons library ---
import {  HiOutlineUsers, HiOutlineRocketLaunch } from 'react-icons/hi2';
import { MdOutlineEngineering } from 'react-icons/md';
import { FaHandHoldingMedical, FaBookOpen  } from 'react-icons/fa6';
import { MdScience } from 'react-icons/md';
const Highlights = () => {
  const headerRef = useScrollAnimation({ y: 30, duration: 0.8, delay: 0.1 });
  const cardsRef = useScrollAnimation({ y: 40, duration: 0.8, stagger: 0.1, delay: 0.3 });
  
  // The 'highlights' array now directly references the imported icon components.
  const highlights = [
    {
      Icon: MdOutlineEngineering, // Replaced custom SVG with React Icon
      title: 'Engineering',
      description: 'Where innovation meets impact through technology, design, and real-world problem-solving.',
      iconBgColor: 'bg-gradient-to-br from-cyan-100 to-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      Icon:  FaHandHoldingMedical, // Replaced custom SVG with React Icon
      title: 'Medical',
      description: ' Showcasing breakthroughs that blend compassion with cutting-edge healthcare innovation.',
      iconBgColor: 'bg-gradient-to-br from-amber-100 to-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      Icon: MdScience, // Replaced custom SVG with React Icon
      title: 'Arts & Science',
      description: 'Celebrating creativity, research, and interdisciplinary thinking that shape tomorrow’s ideas.',
      iconBgColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      Icon: FaBookOpen, // Replaced custom SVG with React Icon
      title: 'Management',
      description: 'Empowering future leaders to drive change, innovation, and entrepreneurial growth',
      iconBgColor: 'bg-gradient-to-br from-purple-100 to-indigo-100',
      iconColor: 'text-indigo-600',
    },
  ];

  return (
    <section className="px-5 md:px-12 py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Subtle background elements for visual depth */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-white to-blue-50/20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center gap-4 mb-12 md:mb-16">
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full">
            What to Expect
          </span>
          <h2 className="text-slate-900 text-4xl md:text-5xl font-bold font-inter text-center">
            Summit Highlights
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-normal text-center max-w-3xl leading-relaxed mt-2">
            Experience Kerala's largest student entrepreneurship platform with world-class speakers, hands-on workshops, and unparalleled networking opportunities.
          </p>
        </div>

        {/* Highlights Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <div key={index} className="w-full">
              <TiltedCard
                captionText={item.title}
                containerHeight="320px"
                containerWidth="100%"
                rotateAmplitude={6}
                scaleOnHover={1.03}
                displayOverlayContent={true}
                overlayContent={
                  <div className="group w-full h-full bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-start transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50">
                    
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 ${item.iconBgColor} group-hover:scale-110`}>
                      {/* The Icon component is now rendered directly from the 'item' object */}
                      <item.Icon className={`w-8 h-8 transition-colors duration-300 ${item.iconColor}`} />
                    </div>
                    
                    <h3 className="text-slate-900 text-xl font-bold font-inter mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-base font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;