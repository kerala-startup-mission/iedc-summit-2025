import React, { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import EventCard from './EventCard';

const LoadingAnimation = () => (
  <div className="flex items-center justify-center py-20">
    <div className="flex gap-2">
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
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

// ---- NEW STRICT RANKING SYSTEM ----

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

// ---- Component ----

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [events, setEvents] = useState([]);
  const [trackData, setTrackData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [eventsRes, tracksRes] = await Promise.all([
          fetch('https://events.startupmission.in/api/event/iedc-summit-2025/agenda/venue'),
          fetch('https://tickets.startupmission.in/api/report/tracks/iedc-summit-2025')
        ]);

        const eventsData = await eventsRes.json();
        const tracksData = await tracksRes.json();

        setTrackData(tracksData);

        const transformed = transformAgendaToEvents(eventsData.agenda);
        const processed = processEventDescriptions(transformed);
        
        // Apply Sorting
        const sorted = sortEvents(processed);

        setEvents(sorted);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    let filtered = events;

    // Filter by Category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.eventType && event.eventType.includes(selectedCategory));
    }

    const query = searchQuery.toLowerCase();
    if (query) {
      filtered = filtered.filter((event) => {
        const title = event.title?.toLowerCase() || '';
        const description = event.description?.toLowerCase() || '';
        return title.includes(query) || description.includes(query);
      });
    }
    
    return filtered;
  }, [events, searchQuery, selectedCategory]);

  return (
    <section className="w-full min-h-screen bg-white relative overflow-hidden">
      <div className="relative py-[10vh] px-5 md:px-8 mt-7">
        {/* Header */}
        <div className="mb-[8vh] md:mb-[12vh] md:flex md:flex-col md:items-center">
          <div className="w-full md:text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-clash-display md:font-black text-blue-500 relative z-20">
              Events
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-md mx-auto md:mx-0 mt-[3vh]">
            <input
              type="text"
              placeholder="Search events"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[5vh] px-5 bg-indigo-100 rounded-[19px] text-sm text-blue-600 placeholder-blue-600 font-gilroy-light focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-600" />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 w-full max-w-md">
            {['All', 'Featured', 'Summit Day', 'Pre-Event', 'Club'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-gilroy-bold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Event cards grid */}
        <div className="w-full max-w-screen-2xl -mt-10 md:-mt-15 mx-auto grid grid-cols-1 md:grid-cols-4 md:auto-rows-fr gap-4 md:gap-6 mb-[10vh]">
          {isLoading ? (
            <div className="col-span-full">
              <LoadingAnimation />
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} trackData={trackData} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl font-gilroy-light text-gray-500">
                No events found
              </p>
            </div>
          )}
        </div>
      </div>

      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 absolute bottom-0 left-0 object-cover"
      />
    </section>
  );
}