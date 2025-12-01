import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TicketPercent, MapPin, Calendar } from "lucide-react";
import LogoLoop from "./LogoLoop";

// --- Constants ---
const EVENT_DATE = "2025-12-22T09:00:00";
const COUPON_CODES = ["MANORAMA25", "HAPPY25", "EARLYBIRD"];

// --- Custom Hooks ---
const useCountdown = (targetDate) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return timeLeft;
};

const useRotatingValue = (items, intervalMs = 3000) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % items.length), intervalMs);
    return () => clearInterval(interval);
  }, [items.length, intervalMs]);
  return items[index];
};

// --- Sub-Components ---

const Timer = ({ timeLeft, size = "md" }) => {
  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HRS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEC", value: timeLeft.seconds },
  ];

  const sizes = {
    sm: { box: "w-[30px] sm:w-[40px]", num: "text-xl sm:text-2xl", label: "text-[10px] sm:text-xs" },
    lg: { box: "w-[4vh] md:w-[6vh] lg:w-[8vh]", num: "text-[3vh] md:text-[4.5vh] lg:text-[6vh]", label: "text-[1vh] md:text-[1.4vh] lg:text-[1.8vh]" },
  };
  const s = sizes[size];

  return (
    <div className="grid grid-cols-4 gap-1.5 md:gap-3 lg:gap-4">
      {timeUnits.map((unit) => (
        <div key={unit.label} className={`flex flex-col items-center ${s.box}`}>
          <div className={`text-blue-600 font-bold font-gilroy-bold leading-none ${s.num}`}>
            {String(unit.value).padStart(2, "0")}
          </div>
          <div className={`text-blue-400 font-bold font-gilroy-bold mt-0.5 ${s.label}`}>
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
};

// Keeping the "Better" Coupon you liked (or let me know if you want the old one)
const FloatingCoupon = ({ currentCode, offerTimeLeft }) => {
  const isExpired = offerTimeLeft.days <= 0 && offerTimeLeft.hours <= 0 && offerTimeLeft.minutes <= 0 && offerTimeLeft.seconds <= 0;

  if (isExpired) {
    return (
      <div className="fixed bottom-5 right-5 md:right-10 z-50 min-w-[180px] md:min-w-[200px]">
        <div className="relative overflow-hidden bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl p-3 md:p-4 shadow-2xl border border-white/20">
          <div className="flex items-center justify-center relative z-10">
            <span className="text-white text-sm md:text-base font-bold font-gilroy-bold uppercase tracking-wider">
              Early Bird Closed
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href="https://tickets.startupmission.in/iedc-summit-2025"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 md:right-10 z-50 min-w-[180px] md:min-w-[200px] cursor-pointer group"
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-3 md:p-4 shadow-2xl shadow-blue-500/40 transform transition-all duration-300 group-hover:scale-105 border border-white/20">
        {/* Shine effect */}
        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
        
        <div className="flex items-center gap-2 md:gap-3 relative z-10">
          <div className="bg-white/20 p-1.5 md:p-2 rounded-lg backdrop-blur-sm">
            <TicketPercent className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-blue-100 text-[9px] md:text-xs font-bold font-gilroy-bold uppercase tracking-wider">
              Early Bird Extended <span className="text-white/40 mx-1">|</span>{" "}
              <span className="text-yellow-300 animate-pulse">
                Ends in {offerTimeLeft.days}d {offerTimeLeft.hours}h {offerTimeLeft.minutes}m
              </span>
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentCode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-white text-base md:text-xl font-black font-gilroy-bold tracking-wide"
              >
                {currentCode}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </a>
  );
};

// --- Layout Components ---

const MobileLayout = ({ timeLeft }) => (
  <div className="md:hidden w-full min-h-screen relative bg-white">
    {/* Decorative Elements (Original) */}
    <div className="w-64 h-64 absolute left-[-29px] top-[500px] opacity-50 rounded-full border-[0.50px] border-blue-600 animate-fade-in-up" style={{ animationDelay: "0.6s" }} />
    <img src="/Ellipse3.svg" alt="" className="w-72 h-72 absolute left-[80px] top-[350px] opacity-50 animate-fade-in-up" style={{ animationDelay: "0.7s" }} />

    {/* Main Content */}
    <div className="px-5 pt-24 pb-20 relative z-10">
      
      {/* IMPROVED HEADLINE TEXT (Applied to Mobile structure) */}
      <h1 className="text-blue-600 text-5xl font-bold font-clash-display leading-[0.9] tracking-tighter mb-3 animate-fade-in-down">
        IEDC <br /> SUMMIT <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">2025</span>
      </h1>
      
      <div className="text-blue-400 text-xl font-semibold font-clash-display mb-2 animate-fade-in-up flex items-center gap-2" style={{ animationDelay: "0.1s" }}>
        <MapPin className="w-5 h-5"/> Kasaragod
      </div>
      
      <div className="flex items-center gap-2 relative mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
         <div className="flex items-center gap-2 text-blue-500 text-lg font-bold font-gilroy-bold relative z-10">
            <Calendar className="w-5 h-5"/> 22 Dec 2025
         </div>
         <div className="w-6 h-6 rounded-full border-[0.32px] border-blue-600 absolute left-[140px]" />
      </div>

      {/* ORIGINAL CTA STYLE */}
      <a
        href="https://tickets.startupmission.in/iedc-summit-2025"
        target="_blank"
        rel="noopener noreferrer"
        className="w-[200px] h-11 rounded-xl flex items-center justify-center relative overflow-hidden group hover:shadow-lg transition-shadow mb-3 z-20 animate-scale-in"
        style={{
          backgroundImage: "url(/hero-blocks.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          animationDelay: "0.3s",
        }}
      >
        <div className="absolute inset-0 bg-violet-600 group-hover:bg-violet-800 transition-bg-color duration-300"></div>
        <div className="text-neutral-100 text-lg font-semibold font-clash-display tracking-tight relative z-10">
          REGISTER NOW
        </div>
      </a>

      <div className="text-red-600 text-xs font-bold font-gilroy-bold mb-3 w-[200px] text-center animate-pulse" style={{ animationDelay: "0.4s" }}>
        We heard your voice! <br/> Early Bird Extended for 48hr!
      </div>

      {/* <div className="text-blue-400 text-sm font-normal font-gilroy-bold animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        *Be quick, connect more*
      </div> */}
    </div>

    <div className="h-32" />

    {/* ORIGINAL IMAGE & TIMER POSITIONING */}
    <div className="absolute bottom-0 right-0 w-[65%] max-w-[260px] z-10 animate-slide-in-right" style={{ animationDelay: "0.8s" }}>
      <img src="/hero-img.png" alt="Decorative" className="w-full h-auto object-contain" />
    </div>
    
    <img src="/hero-blocks.png" alt="" className="w-full h-14 object-cover absolute bottom-0 left-0 z-5 animate-fade-in-up" style={{ animationDelay: "0.9s" }} />

    <div className="absolute bottom-16 left-4 max-w-[320px] animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2.5 shadow-lg border-2 border-blue-200">
        <Timer timeLeft={timeLeft} size="sm" />
      </div>
    </div>
  </div>
);

const DesktopLayout = ({ timeLeft }) => (
  <div className="hidden md:block w-full min-h-screen lg:h-[110vh] relative">
    {/* Decorative Circles (Original) */}
    <img src="/Ellipse2.svg" alt="" className="w-1/2 absolute left-1/2 top-10 opacity-50 animate-fade-in-up delay-100" />
    <img src="/Ellipse3.svg" alt="" className="w-2/5 absolute right-10 top-20 opacity-100 animate-fade-in-up delay-200" />
    <img src="/Ellipse3.svg" alt="" className="w-2/5 absolute -right-80 top-20 opacity-25 animate-fade-in-up delay-300" />
    <img src="/Ellipse3.svg" alt="" className="w-1/3 absolute left-130 bottom-20 opacity-5 animate-fade-in-up delay-400" />

    {/* Main Content Container (Positioned as it was originally) */}
    <div className="w-1/2 absolute top-[6vh] md:top-[25vh] lg:top-[13vh] xl:top-[25vh] left-[10%] flex flex-col gap-3 pb-40 animate-fade-in-down delay-500">
      
      {/* NEW IMPROVED TEXT SECTION */}
      <div className="relative">
        <h1 className="text-[5vh] lg:text-[7vh] xl:text-[8vh] font-bold font-clash-display text-blue-600 leading-[0.9] tracking-tighter drop-shadow-xl mb-4">
          IEDC <br /> SUMMIT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600">
            2025
          </span>
        </h1>
        
        {/* Logo Badge */}
        <img src="/iedc-summit-25-logo.png" alt="IEDC Badge" className="w-[2vh] md:w-[10vh] lg:w-[15vh] absolute -top-[3vh] lg:-top-[8vh] left-[8vh] md:left-[12vh] lg:left-[20vh] animate-scale-in delay-600" />

        {/* Improved Date/Location Row */}
        <div className="flex flex-col gap-2 mt-2">
            <div className="text-[#597fba] text-[2vh] lg:text-[3vh] font-semibold font-gilroy-medium flex items-center gap-2">
              <MapPin className="w-6 h-6"/> Kasaragod
            </div>

            <div className="flex items-center relative my-[0.5vh] lg:my-[1vh]">
              <div className="text-blue-500 text-[2.5vh] lg:text-[4vh] font-black leading-[2vh] font-gilroy-bold relative z-10 flex items-center gap-3">
                 <Calendar className="w-8 h-8"/> 22 Dec 2025
              </div>
            </div>
        </div>

        {/* ORIGINAL CTA BUTTON (Restored) */}
        <a
          href="https://tickets.startupmission.in/iedc-summit-2025"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 lg:px-12 py-3 lg:py-4 rounded-[29px] flex items-center justify-center mt-[4vh] transition-colors duration-300 relative overflow-hidden group w-fit"
        >
          <div className="absolute inset-0 bg-violet-600 group-hover:bg-violet-800 transition-bg-color duration-300"></div>
          <div className="text-white text-[2.5vh] lg:text-[3.5vh] font-normal font-clash-display relative z-10">
            REGISTER NOW
          </div>
        </a>
        <div className="text-red-600 text-sm font-bold font-gilroy-bold mt-2 ml-4 animate-pulse">
            We heard your voice! Early Bird Extended for 48hr!
        </div>
      </div>
    </div>

    {/* ORIGINAL IMAGE & TIMER POSITIONING */}
    <img src="/hero-blocks.png" alt="" className="w-full h-16 lg:h-[10vh] absolute bottom-0 lg:bottom-[9vh] left-0 object-cover animate-fade-in-up delay-700" />
    
    <img 
      src="/hero-img.png" 
      alt="" 
      className="h-[50vh] lg:h-[70vh] xl:h-[90vh] absolute bottom-[1vh] lg:bottom-[8%] right-[1%] object-contain animate-slide-in-right delay-800" 
    />

    <div className="absolute bottom-[10vh] md:bottom-[15vh] lg:bottom-[23vh] right-[2%] md:right-[45%] lg:right-[35%] animate-fade-in-up delay-900">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-3 md:px-5 lg:px-6 py-2 md:py-3 lg:py-4 shadow-xl border-2 border-blue-200">
        <Timer timeLeft={timeLeft} size="lg" />
      </div>
    </div>
  </div>
);

// --- Main Component ---

const Hero = () => {
  const timeLeft = useCountdown(EVENT_DATE);
  const offerTimeLeft = useCountdown("2025-12-03T13:00:00");
  const currentCode = useRotatingValue(COUPON_CODES, 3000);
  const logoList = useMemo(() => Array(9).fill({ text: "IEDC SUMMIT 2025" }), []);

  return (
    <div id="home" className="w-full h-[110vh] md:h-[110vh] relative bg-white overflow-hidden">
      
      <MobileLayout timeLeft={timeLeft} />
      <DesktopLayout timeLeft={timeLeft} />

      {/* Shared Loop Animation */}
      <div className="w-full skew-y-2 absolute bottom-10 left-0 z-10 md:absolute md:bottom-[6vh] lg:bottom-[5vh] md:left-0">
        <LogoLoop
          logos={logoList}
          speed={80}
          direction="right"
          logoHeight={20}
          gap={40}
          pauseOnHover={true}
          className="font-gilroy-bold bg-blue-600 py-5 text-white"
          ariaLabel="IEDC Summit 2025"
        />
      </div>

      <FloatingCoupon currentCode={currentCode} offerTimeLeft={offerTimeLeft} />
    </div>
  );
};

export default Hero;