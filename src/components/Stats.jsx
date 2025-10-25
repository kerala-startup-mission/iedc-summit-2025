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
  
  // Grouped stats into 3 steps as requested
  const stepOne = [
    { icon: Users, value: '100000+', label: 'Innovators', color: 'bg-blue-400' },
    { icon: Users, value: '20000+', label: 'Aspiring change makers', color: 'bg-cyan-400' },
    { icon: Sparkles, value: '5000+', label: 'Leads', color: 'bg-purple-400' },
    { icon: Building2, value: '1000+', label: 'Nodal Officers', color: 'bg-rose-400' },
  ];

  const stepTwo = [
    { icon: Briefcase, value: '150+', label: 'NEST members', color: 'bg-pink-400' },
    { icon: ListChecks, value: '70+', label: 'Cluster coordinators', color: 'bg-fuchsia-400' },
    { icon: ListChecks, value: '14', label: 'Clusters', color: 'bg-violet-400' },
    { icon: Rocket, value: '557', label: 'IEDCs', color: 'bg-green-400' },
  ];

  const stepThree = [
    { icon: Sparkles, value: '5000+', label: 'Ideas', color: 'bg-purple-400' },
    { icon: Home, value: '350+', label: 'Pre Incubatees', color: 'bg-indigo-400' },
    { icon: GraduationCap, value: '250+', label: 'Startups', color: 'bg-amber-400' },
    { icon: Warehouse, value: '25', label: 'TBIs / Coworks', color: 'bg-teal-400' },
  ];

  // const fourthRowStats = [
  // ];

  return (
    <section ref={sectionRef} className="px-4 sm:px-8 py-16 md:py-20 bg-linear-to-br from-blue-600 via-blue-500 to-blue-600">
      <div className="max-w-[1200px] mx-auto">
        {/* Desktop Layout - 3 steps */}
        <div className="hidden md:block space-y-12">
          <div ref={topRowRef} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-4 gap-6">
              {stepOne.map((stat, index) => <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />)}
            </div>
          </div>

          <div ref={middleRowRef} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-4 gap-6">
              {stepTwo.map((stat, index) => <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />)}
            </div>
          </div>

          <div ref={bottomRowRef} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-4 gap-6">
              {stepThree.map((stat, index) => <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />)}
            </div>
          </div>
        </div>

        {/* Mobile Layout - stacked steps with 2 columns */}
        <div className="md:hidden space-y-8">
          <div>
            <div className="grid grid-cols-2 gap-4">
              {stepOne.map((stat, index) => <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />)}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              {stepTwo.map((stat, index) => <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />)}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              {stepThree.map((stat, index) => <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;