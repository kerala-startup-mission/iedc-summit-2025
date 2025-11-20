import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import LogoLoop from "./LogoLoop";

const LoadingAnimation = () => (
  <div className="flex items-center justify-center py-20">
    <div className="flex gap-2">
      <div
        className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: "0.15s" }}
      ></div>
      <div
        className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
        style={{ animationDelay: "0.3s" }}
      ></div>
    </div>
  </div>
);

// ---- Helpers ----

const getEventType = (category) => {
  if (!category) return [];

  const categories = Array.isArray(category)
    ? category
    : String(category)
        .split(',')
        .map((c) => c.trim());

  const types = [];
  if (categories.includes('Featured')) types.push('Featured');
  if (categories.includes('Event')) types.push('Summit Day');
  if (categories.includes('Pre-Event')) types.push('Pre-Event');
  return types;
};

const transformAgendaToEvents = (agenda) => {
  if (!agenda) return [];

  const events = [];

  Object.values(agenda).forEach((dateGroup) => {
    Object.values(dateGroup).forEach((venueEvents) => {
      venueEvents.forEach((event) => {
        const categories = Array.isArray(event.category)
          ? event.category
          : String(event.category)
              .split(',')
              .map((c) => c.trim());

        if (categories.includes('Workshop') || categories.includes('EOI')) return;

        const eventType = getEventType(event.category);

        events.push({
          id: event.id || Math.random(),
          title: event.name || '',
          description: event.description || '',
          registrationLink: event.link || '',
          eventType,
          isFeatured: eventType.includes('Featured'),
          startTime: event.start_time,
          endTime: event.end_time,
          // FIX: Removed the unsafe JSON.parse here. 
          // We will extract posterUrl in the safe processEventDescriptions function.
        });
      });
    });
  });

  return events;
};

// Safely parses JSON descriptions and extracts Poster URLs
const processEventDescriptions = (events) =>
  events.map((event) => {
    const rawDescription = event.description || '';
    const cleanDescription = rawDescription.trim();

    if (!cleanDescription) return event;

    try {
      // 1. Attempt to parse JSON
      const descData = JSON.parse(cleanDescription);
      
      // 2. Extract Description text
      const extractedDescription = descData.description || descData.Description;

      const processedEvent = {
        ...event,
        description: extractedDescription || (typeof descData === 'string' ? descData : event.description),
      };

      // 3. Extract Extra Data (Poster, etc.)
      if (descData.ExtraData) {
        const extra = descData.ExtraData;
        Object.assign(processedEvent, {
          ...(extra.posterUrl && { posterUrl: extra.posterUrl }),
          ...(extra.logos && { logos: extra.logos }),
          ...(extra.slots && { slots: extra.slots }),
          ...(extra.registration_start && { registration_start: extra.registration_start }),
          ...(extra.registration_end && { registration_end: extra.registration_end }),
          ...(extra.vidLink && { vidLink: extra.vidLink }),
          ...(extra.poc && { poc: extra.poc }),
          ...(extra.capacity && { capacity: extra.capacity }),
        });
      }

      return processedEvent;
    } catch (parseError) {
      // 4. Fallback: If JSON parse fails, check if it's a string that LOOKS like JSON 
      // (sometimes APIs return weirdly escaped strings)
      const descMatch = cleanDescription.match(
        /"description"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/
      );

      if (descMatch) {
        return {
          ...event,
          description: descMatch[1].replace(/\\"/g, '"'),
        };
      }
      
      // 5. Final Fallback: It's just a plain string description, return as is.
      return event;
    }
  });

const isEventActive = (event) => {
  const now = new Date();
  
  const regStart = event.registration_start ? new Date(event.registration_start) : null;
  const regEnd = event.registration_end ? new Date(event.registration_end) : null;
  const eventEnd = event.endTime ? new Date(event.endTime) : null;

  if (regStart && now < regStart) return false; // Coming Soon
  if (regEnd && now > regEnd) return false;     // Reg Closed
  if (eventEnd && now > eventEnd) return false; // Event Ended

  return true;
};

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]); 
  const [loopItems, setLoopItems] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          'https://events.startupmission.in/api/event/iedc-summit-2025/agenda/venue'
        );
        const data = await res.json();

        // 1. Get Raw Events (Strings are still raw here)
        const allRawEvents = transformAgendaToEvents(data.agenda);
        
        // 2. SAFELY Process Descriptions (Extracts posters and dates)
        const processedEvents = processEventDescriptions(allRawEvents);

        // 3. Filter for Logo Loop (Active + Summit Day)
        const activeSummitEvents = processedEvents.filter(event => {
          const isSummitEvent = event.eventType.includes('Summit Day');
          const isActive = isEventActive(event);
          return isSummitEvent && isActive;
        });

        // 4. Create Loop Items using the SAFELY processed data
        const loopData = activeSummitEvents.map((event) => ({
          node: (
            <Link
              to="/events"
              className="flex items-center gap-4 p-3 w-[320px] bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group mx-3 h-[88px]"
            >
               {/* Poster Image or Initial Placeholder */}
               <div className="flex items-center justify-center w-14 h-full bg-blue-50 rounded-lg shrink-0 overflow-hidden border border-blue-100 group-hover:bg-blue-100 transition-colors">
                  {event.posterUrl ? (
                    <img
                      src={event.posterUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span 
                    className="text-xl font-bold text-gray-700 leading-none absolute"
                    style={{ display: event.posterUrl ? 'none' : 'block' }}
                  >
                    {event.title.charAt(0).toUpperCase()}
                  </span>
               </div>
               
               {/* Content */}
               <div className="flex-1 min-w-0 flex flex-col justify-center h-full py-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider truncate">
                      {event.eventType[0] || 'Event'}
                    </span>
                  </div>
                  <h4 className="font-clash-display text-sm font-semibold text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h4>
               </div>
               
               <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-sm transition-all shrink-0">
                 <ChevronRight size={16} />
               </div>
            </Link>
          )
        }));
        setLoopItems(loopData);

        // 5. Filter Featured Events for Main Carousel
        const featuredEvents = processedEvents.filter(e => e.isFeatured);
        setEvents(featuredEvents);

      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section
      id="featured-events"
      className="w-full py-5 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="w-96 h-96 left-32 top-1/3 absolute opacity-50 rounded-full border border-blue-600"></div>
      <div className="w-96 h-96 left-0 top-1/2 absolute opacity-30 rounded-full border border-blue-600"></div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10 mb-20">
        {/* Header */}
        <div className="w-full flex flex-col items-start gap-4 text-left relative z-20 -mb-[10vh]">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-clash-display text-blue-500 leading-tight">
            Featured Events
          </h2>
        </div>

        {/* Carousel Container */}
        {isLoading ? (
          <LoadingAnimation />
        ) : events.length > 0 ? (
          <div className="relative">
            {/* Cards Grid */}
            <div className="relative h-[450px] sm:h-[65000px] md:h-[750px] lg:h-[900px] flex items-center justify-center mt-[28vh] mb-[12vh] md:-mt-[20vh] md:-mb-[20vh]">
              {events.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="hidden lg:flex absolute left-0 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg z-20"
                  aria-label="Previous event"
                >
                  <ChevronLeft size={32} />
                </button>
              )}

              <AnimatePresence mode="popLayout">
                {[0, 1, 2].map((offset) => {
                  const cardIndex = (currentIndex + offset) % events.length;
                  const event = events[cardIndex];

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{
                        opacity: 1 - offset * 0.25,
                        scale: 1 - offset * 0.05,
                        x: offset * 20,
                        zIndex: 10 - offset,
                        rotateZ: offset === 0 ? 0 : 4,
                      }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="absolute w-full max-w-sm md:max-w-3xl "
                    >
                      <div className="transform-gpu">
                        <EventCard event={event} />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {events.length > 1 && (
                <button
                  onClick={handleNext}
                  className="hidden lg:flex absolute right-0 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg z-20"
                  aria-label="Next event"
                >
                  <ChevronRight size={32} />
                </button>
              )}
            </div>

            {/* Mobile Navigation Buttons */}
            {events.length > 1 && (
              <div className="lg:hidden flex items-center justify-center gap-8 mb-12">
                <button
                  onClick={handlePrev}
                  className="w-14 h-14 absolute z-20 bottom-100 left-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
                  aria-label="Previous event"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-14 h-14 absolute z-20 bottom-100 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
                  aria-label="Next event"
                >
                  <ChevronRight size={28} />
                </button>
              </div>
            )}

            {/* Scrollable Event Cards Loop */}
            <div className="w-full py-12 relative sm:mt-25 md:mt-0">
              <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />
              
              {loopItems.length > 0 ? (
                 <LogoLoop
                   logos={loopItems}
                   speed={40} 
                   direction="left"
                   logoHeight={90}
                   gap={20}
                   pauseOnHover={true}
                   className="py-2"
                   ariaLabel="All Events List"
                 />
              ) : (
                <div className="text-center text-gray-400 font-gilroy-light text-sm">
                   More events coming soon...
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="w-full text-center py-20">
            <p className="text-2xl font-gilroy-light text-gray-500">
              No featured events available
            </p>
          </div>
        )}
      </div>

      {/* Colored Blocks at Bottom */}
      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 relative bottom-20 left-0 object-cover"
      />

      {/* Bottom Scrolling Text Loop */}
      <div className="w-full relative bottom-[13vh] left-0 skew-y-2">
        <LogoLoop
          logos={Array(8).fill({ text: "IEDC SUMMIT 2025" })}
          speed={80}
          direction="right"
          logoHeight={20}
          gap={40}
          pauseOnHover={true}
          className="font-gilroy-bold bg-blue-600 py-5 text-white"
          ariaLabel="IEDC Summit 2025"
        />
      </div>
    </section>
  );
};

export default FeaturedEvents;