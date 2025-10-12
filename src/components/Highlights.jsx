import React from 'react';

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
    <section id="highlights" className="px-12 py-20 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-3 mb-14">
          <span className="text-blue-600 text-xs font-bold font-inter uppercase tracking-widest">
            What to Expect
          </span>
          <h2 className="text-gray-800 text-5xl font-bold font-inter text-center">
            Summit Highlights
          </h2>
          <p className="text-gray-500 text-base font-normal font-inter text-center max-w-[700px] leading-7 mt-1">
            Experience Kerala's largest student entrepreneurship platform with world-class speakers,
            <br />
            workshops, and networking opportunities
          </p>
        </div>

        {/* Highlights Cards */}
        <div className="flex justify-center gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="w-64 bg-blue-50 rounded-xl border-2 border-blue-100 p-8 flex flex-col items-center"
            >
              <div className="text-5xl mb-8">{item.emoji}</div>
              <h3 className="text-gray-800 text-lg font-bold font-inter text-center mb-4">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm font-normal font-inter text-center leading-snug">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
