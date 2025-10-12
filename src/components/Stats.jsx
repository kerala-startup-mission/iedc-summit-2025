import React from 'react';

const Stats = () => {
  const stats = [
    {
      value: '10th',
      label: 'Anniversary Edition',
    },
    {
      value: '450+',
      label: 'IEDC Centres',
    },
    {
      value: '1 Day',
      label: 'Innovation Festival',
    },
    {
      value: 'All Kerala',
      label: 'Participation',
      multiline: true,
    },
  ];

  return (
    <section className="px-12 py-20 bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-center gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="w-64 px-8 py-10 bg-white rounded-xl shadow-[0px_4px_15px_0px_rgba(37,99,235,0.10)] border-2 border-blue-100 flex flex-col items-center gap-2"
            >
              <div className={`text-blue-600 ${stat.multiline ? 'text-6xl' : 'text-5xl'} font-bold font-inter text-center ${stat.multiline ? 'leading-tight' : 'leading-[89.60px]'}`}>
                {stat.value}
              </div>
              <div className="text-gray-800 text-sm font-medium font-inter text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
