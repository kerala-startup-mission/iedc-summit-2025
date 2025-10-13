import React from 'react';
import TiltedCard from './TiltedCard';

const Highlights = () => {
  const highlights = [
    {
      emoji: '🎯',
      title: 'Workshops',
      description: 'Hands-on sessions led by industry experts',
    },
    {
      emoji: '💡',
      title: 'Keynotes',
      description: 'Inspiring talks from successful entrepreneurs',
    },
    {
      emoji: '🤝',
      title: 'Networking',
      description: 'Connect with innovators and mentors',
    },
    {
      emoji: '🚀',
      title: 'Startup Hub',
      description: 'Transform ideas into viable ventures',
    },
  ];

  return (
    <section id="highlights" className="px-5 md:px-12 py-12 md:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-3 mb-10 md:mb-14">
          <span className="text-blue-600 text-xs font-bold font-inter uppercase tracking-wider md:tracking-widest">
            What to Expect
          </span>
          <h2 className="text-gray-800 text-3xl md:text-5xl font-bold font-inter text-center">
            Summit Highlights
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-normal font-inter text-center max-w-[700px] leading-6 md:leading-7 mt-1 px-4 md:px-0">
            Experience Kerala's largest student entrepreneurship platform with world-class speakers,
            workshops, and networking opportunities
          </p>
        </div>

        {/* Highlights Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 justify-items-center place-items-center">
          {highlights.map((item, index) => (
            <div key={index} className="w-full max-w-xs md:max-w-none md:w-64">
              <TiltedCard
                captionText={item.title}
                containerHeight="240px"
                containerWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-full bg-blue-50 rounded-xl border-2 border-blue-100 p-6 md:p-8 flex flex-col items-center h-full justify-center">
                    <div className="text-4xl md:text-5xl mb-6 md:mb-8">{item.emoji}</div>
                    <h3 className="text-gray-800 text-base md:text-lg font-bold font-inter text-center mb-3 md:mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm font-normal font-inter text-center leading-snug">
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
