import React from 'react';
import TiltedCard from './TiltedCard';
import { Users, Building2, Rocket, GraduationCap, Lightbulb, Briefcase, ListChecks } from 'lucide-react';

const Stats = () => {
  const topRowStats = [
    {
      icon: Users,
      value: '1000+',
      label: 'Student Enterprises',
      color: 'bg-blue-400',
    },
    {
      icon: Building2,
      value: '600+',
      label: 'Incubators',
      color: 'bg-pink-400',
    },
    {
      icon: Rocket,
      value: '557+',
      label: 'IEDCs',
      color: 'bg-green-400',
    },
  ];

  const middleRowStats = [
    {
      icon: GraduationCap,
      value: '500+',
      label: 'Colleges',
      color: 'bg-pink-500',
    },
    {
      icon: Lightbulb,
      value: '200+',
      label: 'Colleges',
      color: 'bg-orange-400',
    },
    {
      icon: Briefcase,
      value: '150+',
      label: 'Startups',
      color: 'bg-yellow-300',
    },
  ];

  const bottomRowStats = [
    {
      icon: ListChecks,
      value: '100+',
      label: 'Startups',
      color: 'bg-pink-400',
    },
  ];

  const renderStatCard = (stat, index) => {
    const Icon = stat.icon;
    return (
      <div key={index} className="w-full">
        <TiltedCard
          containerHeight="160px"
          containerWidth="100%"
          rotateAmplitude={8}
          scaleOnHover={1.05}
          showTooltip={false}
          showMobileWarning={false}
          displayOverlayContent={true}
          overlayContent={
            <div className="w-full h-full px-6 py-6 bg-blue-500/50 backdrop-blur-md rounded-2xl border-2 border-blue-400/60 flex flex-col items-center justify-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]">
              <div className={`${stat.color} w-11 h-11 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.25)]`}>
                <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              
              <div className="text-white text-4xl font-bold font-inter text-center leading-tight drop-shadow-lg">
                {stat.value}
              </div>
              
              <div className="text-white text-xs font-medium font-inter text-center">
                {stat.label}
              </div>
            </div>
          }
        />
      </div>
    );
  };

  return (
    <section className="px-4 sm:px-8 py-16 md:py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-blue-100 text-xs font-semibold tracking-widest uppercase mb-2">
            BY THE NUMBERS
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-bold font-inter">
            IEDC Network Stats
          </h2>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6 mb-6 max-w-4xl mx-auto">
            {topRowStats.map((stat, index) => renderStatCard(stat, index))}
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6 max-w-4xl mx-auto">
            {middleRowStats.map((stat, index) => renderStatCard(stat, index))}
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[280px]">
              {renderStatCard(bottomRowStats[0], 0)}
            </div>
          </div>
        </div>

        <div className="md:hidden flex flex-col gap-4 max-w-sm mx-auto">
          {[...topRowStats, ...middleRowStats, ...bottomRowStats].map((stat, index) => renderStatCard(stat, index))}
        </div>
      </div>
    </section>
  );
};

export default Stats;