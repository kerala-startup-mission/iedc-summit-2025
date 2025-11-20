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

const getEventType = (category) => {
  if (!category) return [];
  const categories = Array.isArray(category)
    ? category
    : String(category).split(',').map((c) => c.trim());

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
          : String(event.category).split(',').map((c) => c.trim());

        if (categories.includes('Workshop') || categories.includes('EOI') || categories.includes('Webinar')) return;

        const eventType = getEventType(event.category);
        if (!eventType || eventType.length === 0) return;

        events.push({
          id: event.id || Math.random(),
          title: event.name || '',
          description: event.description || '',
          registrationLink: event.link || '',
          eventType, 
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

// ---- Sorting Logic ----

const getEventStatusRank = (event) => {
  const now = new Date();
  
  // Determine Start Date (Registration Start -> Event Start -> Default Now)
  const start = event.registration_start 
    ? new Date(event.registration_start) 
    : (event.startTime ? new Date(event.startTime) : new Date());

  // Determine End Date (Registration End -> Event End -> Default Now)
  const end = event.registration_end 
    ? new Date(event.registration_end) 
    : (event.endTime ? new Date(event.endTime) : new Date());

  // Rank 3: Closed (Lowest Priority)
  if (now > end) return 3;

  // Rank 2: Upcoming / Not Started Yet
  if (now < start) return 2;

  // Rank 1: Active / Open (Highest Priority)
  return 1;
};

const getTypePriority = (event) => {
  const types = event.eventType || [];
  // 1. Featured
  if (types.includes('Featured')) return 1;
  // 2. Pre-Events
  if (types.includes('Pre-Event')) return 2;
  // 3. Summit Day Events
  if (types.includes('Summit Day')) return 3;

  return 4;
};

const sortEvents = (events) => {
  return [...events].sort((a, b) => {
    // 1. Primary Sort: Status (Active < Upcoming < Closed)
    const statusA = getEventStatusRank(a);
    const statusB = getEventStatusRank(b);

    if (statusA !== statusB) {
      return statusA - statusB; // Ascending rank (1 comes before 2)
    }

    // 2. Secondary Sort: Within the same status, sort by Type (Featured < Pre < Summit)
    const typeA = getTypePriority(a);
    const typeB = getTypePriority(b);

    return typeA - typeB;
  });
};

// ---- Component ----

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          'https://events.startupmission.in/api/event/iedc-summit-2025/agenda/venue'
        );
        const data = await res.json();

        const transformed = transformAgendaToEvents(data.agenda);
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
    const query = searchQuery.toLowerCase();
    if (!query) return events;

    return events.filter((event) => {
      const title = event.title?.toLowerCase() || '';
      const description = event.description?.toLowerCase() || '';
      return title.includes(query) || description.includes(query);
    });
  }, [events, searchQuery]);

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
        </div>

        {/* Event cards grid */}
        <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 md:auto-rows-fr gap-4 md:gap-6 mb-[10vh]">
          {isLoading ? (
            <div className="col-span-full">
              <LoadingAnimation />
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
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