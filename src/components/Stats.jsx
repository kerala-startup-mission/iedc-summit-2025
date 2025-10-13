import React from 'react';
import TiltedCard from './TiltedCard';

const Stats = () => {
  const stats = [
    {
      value: '10th',
      label: 'Anniversary Edition',
    },
    {
      value: '450+',
      label: 'IEDCs',
    },
    {
      value: '1 Day',
      label: 'Innovation Festival',
    },
    {
      value: 'All Asia',
      label: 'Participation',
      multiline: true,
    },
  ];

  return (
    <section className="px-4 sm:px-8 md:px-12 py-12 md:py-20 bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 place-items-center">
          {stats.map((stat, index) => (
            <div key={index} className="w-full max-w-xs lg:max-w-none lg:w-64">
              <TiltedCard
                containerHeight="220px"
                containerWidth="100%"
                rotateAmplitude={10}
                scaleOnHover={1.05}
                showTooltip={false}
                showMobileWarning={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-full h-full px-8 py-10 bg-white rounded-xl shadow-[0px_4px_15px_0px_rgba(37,99,235,0.10)] border-2 border-blue-100 flex flex-col items-center justify-center gap-2">
                    <div className={`text-blue-600 ${stat.multiline ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'} font-bold font-inter text-center leading-tight`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-800 text-sm font-medium font-inter text-center">
                      {stat.label}
                    </div>
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

export default Stats;
