import React, { useState, useEffect } from "react";
import { useScrollFadeInUp } from "../hooks/useScrollFadeInUp";
import LogoLoop from "./LogoLoop";
import { Train, Bus, Plane, MapPin, ExternalLink } from "lucide-react";

const Directions = () => {
  const [activeCollege, setActiveCollege] = useState("lbs");
  const [activeTransport, setActiveTransport] = useState("train");
  const [hasAnimated, setHasAnimated] = useState(false);
  const headerRef = React.useRef(null);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFadeInUp();

  // Images for each transport mode
  const transportImages = {
    train: "/train.png",
    bus: "/bus.png",
    flight: "/flight.png",
  };

  // Only animate on first mount
  useEffect(() => {
    if (sectionVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [sectionVisible, hasAnimated]);

  const lbsDirections = {
    train: {
      title: "Arriving by Train",
      stations: [
        {
          name: "Kasaragod Railway Station",
          distance: "Approx 13kms away",
          transport: "City bus / Direct auto taxi (~₹300-400)",
        },
        {
          name: "Kanhangad Railway Station",
          distance: "Approx 30kms away",
          transport: "State / Line Bus",
        },
      ],
    },
    bus: {
      title: "Arriving by Bus",
      routes: [
        "Kasaragod Rwy Bustop > Old bus stand > Takeoff Towards Bovikanam, Mulleria, Adoor, Adhur, Sullia > Get down at Povval LBS Stop",
        "Kanhangad Town Stand > Bus Towards Kasaragod via Cherkala > Get off at Cherkala > Bus Towards Mulleria > Get down at Povval LBS Stop",
        "From Kannur Bus Stand: Take bus to Kasaragod via NH-LS > Get down Cherkala > Move to Povval LBS Stop",
        "Povval > LBS College Entrance Gate (500m) | Auto taxi fare ~₹40",
      ],
    },
    flight: {
      title: "Arriving by Flight",
      airports: [
        {
          name: "Mangaluru International Airport",
          distance: "Approx 71km away",
        },
        { name: "Kannur International Airport", distance: "Approx 115km away" },
      ],
      note: "From the Airport, you can take a train, bus, or taxi to reach Kasaragod.",
    },
  };

  const cukDirections = {
    train: {
      title: "Arriving by Train",
      stations: [
        {
          name: "Kanhangad Railway Station",
          distance: "Approx 11.4kms away",
          transport: "State / Line Bus",
        },
        {
          name: "Kasaragod Railway Station",
          distance: "Approx 30kms away",
          transport: "City bus / Direct auto taxi",
        },
      ],
    },
    bus: {
      title: "Arriving by Bus",
      routes: [
        "Bus information for CUK will be available soon. Please check back later or contact us for details.",
      ],
    },
    flight: {
      title: "Arriving by Flight",
      airports: [
        {
          name: "Mangaluru International Airport",
          distance: "Approx 83km away",
        },
        { name: "Kannur International Airport", distance: "Approx 99km away" },
      ],
      note: "From the Airport choose train / bus / taxi",
    },
  };

  const directions = activeCollege === "lbs" ? lbsDirections : cukDirections;
  const currentData = directions[activeTransport];

  return (
    <section
      id="directions"
      ref={sectionRef}
      className={`w-full py-12 md:py-24 bg-white overflow-hidden ${
        hasAnimated ? "fade-in-up-visible" : "fade-in-up-hidden"
      }`}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-12 lg:px-20">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-20">
          <div className="inline-flex justify-center items-center mb-4">
            <img
              src="/iedc-summit-25-logo.png"
              alt="IEDC Logo"
              className="w-16 h-16 md:w-24 md:h-24 object-contain"
            />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal font-clash-display text-gray-900 mb-4 leading-tight">
            Get Directions to the <span className="text-blue-600">Event</span>
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          
          {/* Left Column: Controls & Text */}
          <div className="flex flex-col h-full">
            
            {/* Venue Info & Map Button */}
            <div className="mb-8 pb-8 border-b border-gray-100">
              <h3 className="text-2xl md:text-3xl font-clash-display font-normal text-gray-900 mb-3">
                How to Reach LBSCEK
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-6">
                <div className="text-gray-600 font-gilroy-medium">
                  <span className="text-gray-400 block text-xs uppercase tracking-wider mb-1">Venue</span>
                  {activeCollege === "lbs" ? "IEDC Summit 2025" : "Nodal Officer's Meet"}
                </div>
                <div className="text-gray-600 font-gilroy-medium">
                  <span className="text-gray-400 block text-xs uppercase tracking-wider mb-1">Date</span>
                  {activeCollege === "lbs" ? "22 Dec 2025" : "21 Dec 2025"}
                </div>
              </div>
              
              <a
                href={
                  activeCollege === "lbs"
                    ? "https://maps.app.goo.gl/25U116tE8YQsnNtn6"
                    : "https://maps.app.goo.gl/zhfTwny2aWRhLv9a7"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-blue-600 text-white font-clash-display rounded-full transition-all duration-300 group w-fit"
              >
                <MapPin className="w-5 h-5 group-hover:animate-bounce" />
                Open in Google Maps
                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Transport Tabs */}
            <div className="flex p-1 bg-gray-100 rounded-xl gap-1 mb-8 w-fit">
              {[
                { id: "train", icon: Train, label: "Train" },
                { id: "bus", icon: Bus, label: "Bus" },
                { id: "flight", icon: Plane, label: "Flight" },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveTransport(mode.id)}
                  className={`px-4 md:px-6 py-2.5 rounded-lg font-gilroy-bold text-sm md:text-base transition-all flex items-center gap-2 ${
                    activeTransport === mode.id
                      ? "bg-white text-blue-600 shadow-sm scale-105"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <mode.icon size={18} />
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Dynamic Text Content */}
            <div className="flex-grow animate-fade-in-up">
              <h4 className="text-xl font-clash-display text-gray-900 mb-6 flex items-center gap-2">
                {currentData.title}
              </h4>

              <div className="space-y-6">
                {/* Train Stations */}
                {activeTransport === "train" &&
                  currentData.stations?.map((station, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-blue-100">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white"></div>
                      <p className="text-lg text-gray-900 font-gilroy-bold mb-1">
                        {station.name}
                      </p>
                      <p className="text-blue-500 font-gilroy-medium text-sm mb-1">
                        {station.distance}
                      </p>
                      <p className="text-gray-500 font-gilroy-regular text-sm">
                        Via: {station.transport}
                      </p>
                    </div>
                  ))}

                {/* Bus Routes */}
                {activeTransport === "bus" &&
                  currentData.routes?.map((route, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-8 h-8 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 font-gilroy-medium leading-relaxed pt-1">
                        {route}
                      </p>
                    </div>
                  ))}

                {/* Airports */}
                {activeTransport === "flight" && (
                  <>
                    {currentData.airports?.map((airport, idx) => (
                      <div key={idx} className="flex items-start justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                        <div>
                          <p className="text-gray-900 font-gilroy-bold">
                            {airport.name}
                          </p>
                          <p className="text-gray-500 text-sm font-gilroy-medium mt-1">
                            {airport.distance}
                          </p>
                        </div>
                        <Plane className="text-blue-300" size={20} />
                      </div>
                    ))}
                    <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-xl text-sm font-gilroy-medium flex gap-3 items-start">
                      {currentData.note}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Image */}
          <div className="hidden lg:block relative h-full min-h-[500px]">
            <div className="sticky top-24 w-full h-[500px] rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 group">
               {/* Image Overlay Gradient */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
               
               {/* Image switching animation */}
               <img 
                  key={activeTransport}
                  src={transportImages[activeTransport]} 
                  alt={activeTransport}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 animate-scale-in"
               />

               {/* Caption on Image */}
               <div className="absolute bottom-0 left-0 w-full p-8 z-20 text-white">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                      {activeTransport === 'train' && <Train size={24} />}
                      {activeTransport === 'bus' && <Bus size={24} />}
                      {activeTransport === 'flight' && <Plane size={24} />}
                    </div>
                    <span className="font-clash-display text-xl tracking-wide uppercase">
                      {activeTransport} Travel
                    </span>
                 </div>
                 <p className="text-white/80 font-gilroy-light text-sm max-w-xs">
                    Enjoy the scenic route to Kasaragod. We can't wait to see you there!
                 </p>
               </div>
            </div>
            
            {/* Decorative Element behind image */}
            <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-blue-100 rounded-[2rem]"></div>
          </div>

        </div>
      </div>

      {/* Colored Blocks at Bottom */}
      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-16 md:h-24 object-cover mt-20"
      />

      {/* Scrolling Text Loop */}
      <div className="w-full -mt-8 md:-mt-10 -skew-y-2 relative z-20">
        <LogoLoop
          logos={Array(8).fill({ text: "IEDC SUMMIT 2025" })}
          speed={80}
          direction="right"
          logoHeight={20}
          gap={40}
          pauseOnHover={true}
          className="font-gilroy-bold bg-blue-600 py-4 md:py-6 text-white"
          ariaLabel="IEDC Summit 2025"
        />
      </div>
    </section>
  );
};

export default Directions;