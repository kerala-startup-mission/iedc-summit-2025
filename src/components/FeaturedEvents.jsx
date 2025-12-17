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

// Fixes date string format for Safari/JS compatibility
const parseDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr.replace(' ', 'T'));
};

const getEventType = (category) => {
  if (!category) return [];
  const categories = Array.isArray(category)
    ? category
    : String(category).split(',').map((c) => c.trim());

  const types = [];
  if (categories.includes('Featured')) types.push('Featured');
  if (categories.includes('Event')) types.push('Summit Day');
  if (categories.includes('Pre-Event')) types.push('Pre-Event');
  if (categories.includes('Club')) types.push('Club');
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
          : String(event.category).split(',').map((c) => c.trim());

        if (categories.includes('Workshop') || categories.includes('EOI') || categories.includes('Webinar')) return;

        const eventType = getEventType(event.category);
        if (!eventType || eventType.length === 0) return;

        let clubName = null;
        if (eventType.includes('Club')) {
             const knownKeywords = ['Featured', 'Event', 'Pre-Event', 'Club', 'Workshop', 'EOI', 'Webinar'];
             const otherCats = categories.filter(c => !knownKeywords.includes(c));
             if (otherCats.length > 0) clubName = otherCats[0];
        }

        events.push({
          id: event.id || Math.random(),
          title: event.name || '',
          description: event.description || '',
          registrationLink: event.link || '',
          link_text: event.link_text || '',
          eventType, 
          clubName,
          startTime: event.start_time,
          endTime: event.end_time,
        });
      });
    });
  });
  return events;
};

const processEventDescriptions = (events) =>
  events.map((event) => {
    const rawDescription = event.description || '';
    const cleanDescription = rawDescription.trim();
    
    let processedEvent = { ...event };

    if (cleanDescription) {
        try {
          const descData = JSON.parse(cleanDescription);
          const extractedDescription = descData.description || descData.Description;

          processedEvent.description = extractedDescription || event.description;

          if (descData.id) {
            processedEvent.customOrder = Number(descData.id);
          }

          if (descData.ExtraData) {
            const extra = descData.ExtraData;
            Object.assign(processedEvent, {
              posterUrl: extra.posterUrl,
              logos: extra.logos,
              slots: extra.slots,
              registration_start: extra.registration_start,
              registration_end: extra.registration_end,
              vidLink: extra.vidLink,
              poc: extra.poc,
              capacity: extra.capacity,
            });
          }
        } catch (parseError) {
          // Description is just string, keep as is
        }
    }
    return processedEvent;
  });

const getEventRank = (event) => {
  const now = new Date();
  
  // 1. Parse Dates Safely
  const start = parseDate(event.registration_start) || parseDate(event.startTime) || new Date();
  const end = parseDate(event.registration_end) || parseDate(event.endTime) || new Date();

  // 2. Determine Status
  const isClosed = now > end;
  const isUpcoming = now < start;
  
  // Check fullness
  const slots = parseInt(event.slots || 0);
  const capacity = parseInt(event.capacity || 0);
  const isFull = capacity > 0 && slots >= capacity;

  // 3. Determine Base Score based on STATUS (Major Grouping)
  // Active = 0
  // Active Full = 50
  // Upcoming = 100
  // Closed = 200
  let statusScore = 0;
  if (isClosed) statusScore = 200;
  else if (isUpcoming) statusScore = 100;
  else if (isFull) statusScore = 50; // Deprioritize full events
  else statusScore = 0;

  // 4. Determine Type Score (Sub-sorting within status)
  // Featured = 1
  // Pre-Event = 2
  // Summit Day = 3
  const types = event.eventType || [];
  let typeScore = 10; // Fallback

  if (types.includes('Featured')) typeScore = 1;
  else if (types.includes('Pre-Event')) typeScore = 2;
  else if (types.includes('Summit Day')) typeScore = 3;
  else if (types.includes('Club')) typeScore = 4;

  // Final Score = Status + Type
  return statusScore + typeScore;
};

const sortEvents = (events) => {
  return [...events].sort((a, b) => {
    if (a.customOrder !== undefined && b.customOrder !== undefined) return a.customOrder - b.customOrder;
    if (a.customOrder !== undefined) return -1;
    if (b.customOrder !== undefined) return 1;

    const rankA = getEventRank(a);
    const rankB = getEventRank(b);

    // 1. Primary Sort: By Calculated Rank (Status Group + Type Priority)
    if (rankA !== rankB) {
      return rankA - rankB;
    }

    // 2. Secondary Sort (Tie-breaker within same group & type)
    
    // If Closed, show MOST RECENTLY closed first
    if (rankA >= 200) {
      const endA = parseDate(a.registration_end) || parseDate(a.endTime);
      const endB = parseDate(b.registration_end) || parseDate(b.endTime);
      return endB - endA; 
    }

    // Otherwise (Active or Upcoming), show SOONEST start date first
    const startA = parseDate(a.registration_start) || parseDate(a.startTime);
    const startB = parseDate(b.registration_start) || parseDate(b.startTime);
    return startA - startB;
  });
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
          fetch('https://events.startupmission.in/api/event/iedc-summit-2025-website/agenda/venue'),
          fetch('https://tickets.startupmission.in/api/report/tracks/iedc-summit-2025')
        ]);

        const eventsData = await eventsRes.json();
        const tracksData = await tracksRes.json();

        setTrackData(tracksData);

        const transformed = transformAgendaToEvents(eventsData.agenda);
        const processed = processEventDescriptions(transformed);
        
        // Filter logic (Same as Events.jsx)
        const mainEvents = processed.filter(event => {
          if (event.eventType.includes('Pre-Event') && event.eventType.length === 1) return false;
          if (event.eventType.includes('Club') && !event.eventType.includes('Summit Day')) return false;
          return true;
        });

        // Apply Sorting (Same as Events.jsx)
        const sorted = sortEvents(mainEvents);

        // Take top 4 for Featured section
        setFeaturedEvents(sorted.slice(0, 4));

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