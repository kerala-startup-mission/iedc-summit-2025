import React, { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

const Schedule = () => {
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [cardHeights, setCardHeights] = useState({});
  const [sectionHeight, setSectionHeight] = useState("140vh");
  const venueListRef = React.useRef(null);
  
  const [venues, setVenues] = useState([]);
  const [scheduleData, setScheduleData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("https://events.startupmission.in/api/event/iedc-summit-2025/agenda/venue");
        const data = await response.json();
        
        const agenda = data.agenda || {};
        const allVenues = data.venues || [];
        
        // Extract active venues from agenda
        const activeVenues = new Set();
        Object.values(agenda).forEach(dateObj => {
            Object.keys(dateObj).forEach(venueName => {
                if (dateObj[venueName] && dateObj[venueName].length > 0) {
                    // Only include venue if it has events with a category
                    if (dateObj[venueName].some(event => event.category)) {
                        activeVenues.add(venueName);
                    }
                }
            });
        });
        
        // Filter venues list to only show those with events
        const excludedVenues = ["Website", "Webinars ", "EOIs", "LBS College of Engineering Kasaragod", "Webinars - 1", "Webinars - 2"];
        const filteredVenues = allVenues.filter(v => activeVenues.has(v) && !excludedVenues.includes(v));
        const finalVenues = filteredVenues.length > 0 ? filteredVenues : Array.from(activeVenues).filter(v => !excludedVenues.includes(v));

        setVenues(finalVenues);
        setScheduleData(agenda);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  const currentEvents = React.useMemo(() => {
    if (!venues.length || !scheduleData) return [];
    const venueName = venues[selectedLocation];
    
    let events = [];
    Object.keys(scheduleData).forEach(date => {
        const dateEvents = scheduleData[date];
        if (dateEvents && dateEvents[venueName]) {
            events = [...events, ...dateEvents[venueName]];
        }
    });

    // Filter out events without category
    events = events.filter(event => event.category);

    // Sort by start_time
    events.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
    
    return events;
  }, [venues, selectedLocation, scheduleData]);

  useEffect(() => {
    setExpandedItems(currentEvents.map((_, index) => index));
    setCardHeights({});
  }, [currentEvents]);

  const toggleExpand = (index) => {
    setExpandedItems((prev) => (prev.includes(index) ? [] : [index]));
  };

  const updateCardHeight = (index, height) => {
    setCardHeights((prev) => ({ ...prev, [index]: height }));
  };

  const calculateTopPosition = (index) => {
    let top = 20;
    const baseSpacing = window.innerWidth >= 768 ? 105 : 80;
    for (let i = 0; i < index; i++) {
      if (expandedItems.includes(i) && cardHeights[i]) {
        top += cardHeights[i] - 20;
      } else {
        top += baseSpacing;
      }
    }
    return top;
  };

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;
    
    const baseSpacing = isMobile ? 80 : 105;
    let calculatedHeight = 20; // Initial top margin
    
    currentEvents.forEach((_, index) => {
      if (expandedItems.includes(index) && cardHeights[index]) {
        calculatedHeight += cardHeights[index] - 20;
      } else {
        calculatedHeight += baseSpacing;
      }
    });
    
    // Dynamic header height calculation
    const venueHeight = venueListRef.current ? venueListRef.current.offsetHeight : (isMobile ? 80 : 100);
    const titleHeight = isMobile ? 150 : 200; // Approximate height for title and spacing
    const headerHeight = venueHeight + titleHeight;

    let bottomPadding;
    
    if (isMobile) {
      bottomPadding = 50;
    } else if (isTablet) {
      bottomPadding = 120;
    } else {
      bottomPadding = 200;
    }
    
    calculatedHeight += headerHeight + bottomPadding;
    
    // Ensure minimum height
    const minHeight = isMobile ? 800 : 1000;
    calculatedHeight = Math.max(calculatedHeight, minHeight);

    const calculatedVh = `${calculatedHeight}px`;
    
    setSectionHeight(calculatedVh);
  }, [expandedItems, cardHeights, currentEvents]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
        return "";
    }
  };

  const formatTimeOnly = (dateString) => {
    if (!dateString) return "";
    try {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    } catch {
        return "";
    }
  };

  const parseDescription = (desc) => {
    if (!desc) return "";
    try {
      const parsed = JSON.parse(desc);
      return parsed.Description || desc;
    } catch {
      return desc;
    }
  };

  const getSpeakers = (item) => {
    if (!item.speakers) return [];
    if (Array.isArray(item.speakers)) return item.speakers;
    
    if (typeof item.speakers === 'object') {
        let allSpeakers = [];
        Object.entries(item.speakers).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                const speakersWithRole = value.map(s => ({
                    ...s,
                    role: key // e.g., 'speaker', 'panelist', 'moderator'
                }));
                allSpeakers = [...allSpeakers, ...speakersWithRole];
            }
        });
        return allSpeakers;
    }
    return [];
  };

  const getEventColor = (index) => {
    const colors = ["#F8D247", "#2FEEC4", "#6495FD", "#FD83FD"];
    return colors[index % colors.length];
  };

  return (
    <section
      id="Schedule"
      className="w-full overflow-y-hidden bg-white relative"
    >
      <div 
        className="mb-8 md:mb-5 md:flex md:flex-col md:items-center relative py-10 px-5 mt-15 md:mt-20"
        style={{ minHeight: sectionHeight }}
      >
        <div className="w-full md:text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-clash-display md:font-bold text-blue-500 relative z-20">
            Schedule
          </h2>
          <div className="w-full px-6">
            <h3 className="text-lg font-light font-gilroy-light">
              Be on Time
            </h3>
          </div>
        </div>

        {loading ? (
             <div className="w-full flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
             </div>
        ) : (
            <>
                <div 
                    ref={venueListRef}
                    className="w-full md:w-[90%] flex gap-4 flex-nowrap overflow-x-auto md:flex-wrap md:justify-center px-5 py-6 scrollbar-hide"
                >
                {venues.map((loc, index) => (
                    <div
                    key={index}
                    onClick={() => setSelectedLocation(index)}
                    className={`shrink-0 px-4 font-gilroy-light py-2 text-sm md:text-base rounded-4xl shadow-md cursor-pointer transition-colors duration-200 ${
                        selectedLocation === index
                        ? "bg-blue-500 text-white border border-blue-500"
                        : "border border-blue-500 text-blue-500 hover:bg-blue-50"
                    }`}
                    >
                    {loc}
                    </div>
                ))}
                </div>
                <div className="w-full md:w-[70%] min-h-[18vh] mt-10 relative">
                <div className="w-full relative mx-auto rounded-4xl h-1/2 bg-transparent"></div>
                {currentEvents.length > 0 ? (
                    currentEvents.map((item, index) => {
                    const speakers = getSpeakers(item);
                    return (
                    <div
                    key={item.id || index}
                    ref={(el) => {
                        if (el && expandedItems.includes(index)) {
                        const height = el.offsetHeight;
                        if (cardHeights[index] !== height) {
                            updateCardHeight(index, height);
                        }
                        }
                    }}
                    className="absolute w-full mx-auto rounded-4xl z-9 px-5 py-4 md:px-10 md:py-5 transition-all duration-300 shadow-xl hover:shadow-2xl"
                    style={{
                        top: `${calculateTopPosition(index)}px`,
                        height: expandedItems.includes(index) || index === currentEvents.length - 1 ? "auto" : "100%",
                        backgroundColor: getEventColor(index),
                    }}
                    >
                    <div className="w-full h-auto flex flex-row justify-between items-center">
                        <div className="font-normal font-clash-display text-lg md:text-2xl flex flex-row items-center gap-2">
                        <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                            <span>{formatDate(item.start_time)}</span>
                            <span className="text-xs md:text-lg hidden md:inline opacity-50">|</span>
                            <span className="text-xs md:text-xl">
                              {formatTimeOnly(item.start_time)}
                            </span>
                        </div>
                        </div>
                        <div className="font-medium font-clash-display text-lg md:text-2xl text-right pl-4 leading-snug">
                        {item.name}
                        </div>
                    </div>
                    {expandedItems.includes(index) && (
                        <div className="mt-4 text-sm text-center">
                        {speakers.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-8 md:gap-x-4 font-gilroy-light md:mt-10">
                            {speakers.map((speaker, speakerIndex) => (
                                <div
                                key={speakerIndex}
                                className="flex flex-row justify-start gap-4 px-2 w-full"
                                >
                                <div className="flex flex-row gap-3 items-start w-full">
                                    <img
                                    src={speaker.image || speaker.photo || "https://i.pravatar.cc/150?img=5"}
                                    alt=""
                                    className="rounded-full w-16 h-16 md:w-20 md:h-20 object-cover shrink-0"
                                    />
                                    <div className="flex flex-col items-start text-left">
                                    <p className="font-medium md:text-lg leading-tight text-gray-900">
                                        {speaker.name}
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-600 mt-1 font-medium">
                                        {speaker.title || speaker.designation}
                                    </p>
                                    {speaker.role && (
                                        <span className="text-[10px] md:text-xs bg-black/5 text-gray-600 px-2 py-0.5 rounded-full mt-1 capitalize border border-black/5">
                                            {speaker.role}
                                        </span>
                                    )}
                                    </div>
                                </div>
                                </div>
                            ))}
                            </div>
                        )}
                        <p className="mb-3 font-gilroy-light md:text-lg md:mt-8 whitespace-pre-wrap">
                            {parseDescription(item.description)}
                        </p>
                        </div>
                    )}
                    </div>
                    );
                    })
                ) : (
                    <div className="text-center py-10 text-gray-500 font-gilroy-light text-xl">
                        No events scheduled for this venue.
                    </div>
                )}
                </div>
            </>
        )}
      </div>

      {/* Colored Blocks at Bottom */}
      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 absolute bottom-0 left-0 object-cover"
      />
    </section>
  );
};

export default Schedule;