import React from 'react';
import LogoLoop from './LogoLoop';

const Highlights = () => {
  const highlights = [
    {
      title: 'Engineering',
      description: 'Where innovation meets impact through technology, design, and real-world problem-solving.',
      bgColor: 'bg-[#4D84F7]',
      svg: '/engineering-bg.svg',
    },
    {
      title: 'Medical',
      description: 'Showcasing breakthroughs that blend compassion with cutting-edge healthcare innovation.',
      bgColor: 'bg-[#E371E3]',
      svg: '/medical-bg.svg',
    },
    {
      title: 'Arts & Science',
      description: 'Celebrating creativity, research, and interdisciplinary thinking that shape tomorrow\'s ideas.',
      bgColor: 'bg-[#4D84F7]',
      svg: '/arts-science-bg.svg',
    },
    {
      title: 'Management',
      description: 'Empowering future leaders to drive change, innovation, and entrepreneurial growth.',
      bgColor: 'bg-[#3E80BF]',
      svg: '/management-bg.svg',
    },
  ];

  const HighlightCard = ({ item, position }) => {
    return (
      <div className={`${item.bgColor} p-8 w-full aspect-square flex flex-col justify-start items-start relative overflow-hidden`}>
        {/* Background SVG */}
        {position === 'engineering' && (
          <img 
            src={item.svg} 
            alt="" 
            className="absolute bottom-0 left-0 w-full h-auto"
          />
        )}
        {position === 'arts' && (
          <img 
            src={item.svg} 
            alt="" 
            className="absolute top-0 right-0 w-auto h-full"
          />
        )}
        {position === 'medical' && (
          <img 
            src={item.svg} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {position === 'management' && (
          <img 
            src={item.svg} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl font-semibold font-clash-display text-white mb-4 text-left">
            {item.title}
          </h3>
          <p className="text-sm text-white font-clash-display leading-relaxed text-left">
            {item.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="highlights" className="w-full bg-white overflow-hidden relative">
      {/* Header Section */}
      <div className="px-12 pt-12 pb-16 flex items-start justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1">
          <h2 className="text-8xl font-light font-clash-display text-blue-500 mb-8">
          Summit Highlights
        </h2>
          <p className="text-2xl text-black font-normal font-gilroy-light max-w-md leading-relaxed">
          Experience Kerala's largest student entrepreneurship platform with world-class speakers, hands-on workshops, and unparalleled networking opportunities.
        </p>
        </div>

        {/* Right Cards Grid */}
        <div className="grid grid-cols-2 gap-4 w-150">
          <HighlightCard item={highlights[0]} position="engineering" />
          <HighlightCard item={highlights[1]} position="medical" />
          <HighlightCard item={highlights[2]} position="arts" />
          <HighlightCard item={highlights[3]} position="management" />
        </div>
      </div>

      {/* Colored Blocks at Bottom */}
      <img 
        src="/hero-blocks.png" 
        alt="Decorative blocks" 
        className="w-full h-20 sm:h-24 object-cover"
      />

      {/* Scrolling Text Loop */}
      <div className="w-full -mt-7 mb-10 skew-y-2">
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
          direction="left"
          logoHeight={20}
          gap={40}
          pauseOnHover={true}
          className="font-gilroy-bold bg-blue-600 py-5  text-white"
          ariaLabel="IEDC Summit 2025"
        />
      </div>
    </section>
  );
};

export default Highlights;