import React, { useState, useEffect, useRef } from 'react';
import TiltedCard from './TiltedCard';
import { Users, Building2, Rocket, GraduationCap, Lightbulb, Briefcase, ListChecks, Sparkles, Home, Warehouse } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import useCountUp from '../hooks/useCountUp';

const StatCard = ({ stat, index, isVisible }) => {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, 2000, isVisible);

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
              {count}
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

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const topRowRef = useScrollAnimation({ y: 40, duration: 0.8, stagger: 0.15, delay: 0.2 });
  const middleRowRef = useScrollAnimation({ y: 40, duration: 0.8, stagger: 0.15, delay: 0.35 });
  const bottomRowRef = useScrollAnimation({ y: 40, duration: 0.8, stagger: 0.15, delay: 0.5 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  const topRowStats = [
    {
      icon: Users,
      value: '100000+',
      label: 'Innovators',
      color: 'bg-blue-400',
    },
    {
      icon: Sparkles,
      value: '5000+',
      label: 'Ideas',
      color: 'bg-purple-400',
    },
    {
      icon: Rocket,
      value: '550+',
      label: 'IEDCs',
      color: 'bg-green-400',
    },
  ];

  const middleRowStats = [
    {
      icon: Building2,
      value: '600+',
      label: 'Nodal Officers',
      color: 'bg-pink-500',
    },
    {
      icon: GraduationCap,
      value: '250+',
      label: 'Registered Startups',
      color: 'bg-pink-400',
    },
    {
      icon: Lightbulb,
      value: '200+',
      label: 'Speakers',
      color: 'bg-orange-400',
    },
  ];
  
  const thirdRowStats = [
    {
      icon: ListChecks,
      value: '100+',
      label: 'Sessions',
      color: 'bg-pink-400',
    },
    
    {
      icon: Home,
      value: '25+',
      label: 'Incubators',
      color: 'bg-indigo-400',
    },
    {
      icon: Warehouse,
      value: '5+',
      label: 'LEAP Coworks',
      color: 'bg-teal-400',
    },
  ];

  // const fourthRowStats = [
  // ];

  return (
    <section ref={sectionRef} className="px-4 sm:px-8 py-16 md:py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600">
      <div className="max-w-[1200px] mx-auto">
        {/* Desktop Layout - 3 columns */}
        <div className="hidden md:block">
          <div ref={topRowRef} className="grid grid-cols-3 gap-6 mb-6 max-w-4xl mx-auto">
            {topRowStats.map((stat, index) => <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />)}
          </div>

          <div ref={middleRowRef} className="grid grid-cols-3 gap-6 mb-6 max-w-4xl mx-auto">
            {middleRowStats.map((stat, index) => <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />)}
          </div>

          <div ref={bottomRowRef} className="grid grid-cols-3 gap-6 mb-6 max-w-4xl mx-auto">
            {thirdRowStats.map((stat, index) => <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />)}
          </div>
        </div>

        {/* Mobile Layout - 2 columns */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-4">
            {[...topRowStats, ...middleRowStats, ...thirdRowStats].map((stat, index) => <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;