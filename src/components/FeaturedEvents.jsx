import React, { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import LogoLoop from "./LogoLoop";
import EventCard from "./EventCard";

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
    } catch {
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
  const [featuredEvents, setFeaturedEvents] = useState([]); 
  const [trackData, setTrackData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const fetchEvents = async () => {
      try {
        const [eventsRes, tracksRes] = await Promise.all([
          fetch('https://events.startupmission.in/api/event/iedc-summit-2025/agenda/venue'),
          fetch('https://tickets.startupmission.in/api/report/tracks/iedc-summit-2025')
        ]);

        const data = await eventsRes.json();
        const tracks = await tracksRes.json();
        setTrackData(tracks);

        // 1. Get Raw Events (Strings are still raw here)
        const allRawEvents = transformAgendaToEvents(data.agenda);
        
        // 2. SAFELY Process Descriptions (Extracts posters and dates)
        const processedEvents = processEventDescriptions(allRawEvents);

        // 3. Filter for List (Active + Summit Day + Not Full)
        const activeSummitEvents = processedEvents.filter(event => {
          const isSummitEvent = event.eventType.includes('Summit Day');
          const isActive = isEventActive(event);
          
          const slots = parseInt(event.slots || 0);
          const capacity = parseInt(event.capacity || 0);
          const isFull = capacity > 0 && slots >= capacity;

          return isSummitEvent && isActive && !isFull;
        });

        // Take top 5
        setFeaturedEvents(activeSummitEvents.slice(0, 5));

      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="featured-events"
      className="w-full py-5 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="w-96 h-96 left-32 top-1/3 absolute opacity-50 rounded-full border border-blue-600"></div>
      <div className="w-96 h-96 left-0 top-1/2 absolute opacity-30 rounded-full border border-blue-600"></div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10 mb-20">
        {/* Header */}
        <div className="w-full flex flex-col items-start gap-4 text-left relative z-20 mb-12">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-clash-display text-blue-500 leading-tight">
            Featured Events
          </h2>
        </div>

        {/* List Container */}
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <div className="w-full py-12 relative">
            {featuredEvents.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {featuredEvents.map((event) => (
                    <EventCard key={event.id} event={event} trackData={trackData} truncateDescription={true} />
                  ))}
                  
                  {/* View All Card */}
                  <Link
                    to="/events"
                    className="col-span-1 min-h-[300px] flex flex-col items-center justify-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-dashed border-blue-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all group"
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ChevronRight size={32} className="text-blue-600" />
                    </div>
                    <span className="text-xl font-bold text-blue-600 font-clash-display">
                      View All Events
                    </span>
                  </Link>
               </div>
            ) : (
              <div className="text-center text-gray-400 font-gilroy-light text-sm">
                 More events coming soon...
              </div>
            )}
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