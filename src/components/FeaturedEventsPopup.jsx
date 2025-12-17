import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedEventsPopup = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Fixes date string format for Safari/JS compatibility
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr.replace(' ', 'T'));
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://events.startupmission.in/api/event/iedc-summit-2025-website/agenda/venue"
        );
        const data = await response.json();
        
        // Extract and filter featured events
        const allEvents = [];
        const seenIds = new Set();
        const now = new Date();

        if (data.agenda) {
          Object.values(data.agenda).forEach((dateGroup) => {
            Object.values(dateGroup).forEach((venueEvents) => {
              venueEvents.forEach((event) => {
                const categories = Array.isArray(event.category)
                  ? event.category
                  : String(event.category).split(",").map((c) => c.trim());
                
                if (categories.includes("Featured")) {
                  // Determine end time (prefer registration_end from ExtraData)
                  let endTime = parseDate(event.end_time);
                  
                  try {
                    if (event.description) {
                      const descData = JSON.parse(event.description);
                      if (descData?.ExtraData?.registration_end) {
                        endTime = parseDate(descData.ExtraData.registration_end);
                      }
                    }
                  } catch (error) {
                    // Ignore JSON parse errors
                  }

                  // Only add if event is not closed and not duplicate
                  if (endTime && now <= endTime) {
                    if (!seenIds.has(event.id)) {
                      seenIds.add(event.id);
                      allEvents.push(event);
                    }
                  }
                }
              });
            });
          });
        }
        setEvents(allEvents);
      } catch (error) {
        console.error("Error fetching featured events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [events.length]);

  if (!isVisible) return null;
  if (!isLoading && events.length === 0) return null;

  // Helper to get details from description JSON
  const getEventDetails = (description) => {
    try {
      const descData = JSON.parse(description);
      return {
        posterUrl: descData?.ExtraData?.posterUrl || null,
        descriptionText: descData?.description || descData?.Description || description
      };
    } catch (error) {
      return {
        posterUrl: null,
        descriptionText: description
      };
    }
  };

  const currentEvent = !isLoading && events.length > 0 ? events[currentIndex] : null;
  const { posterUrl, descriptionText } = currentEvent ? getEventDetails(currentEvent.description) : { posterUrl: null, descriptionText: '' };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-[750px]">
      <div className="relative bg-white rounded-xl shadow-2xl outline-2 outline-blue-600/75 overflow-hidden min-h-[300px]">
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          className="absolute top-2 right-2 z-50 p-1.5 bg-black/10 hover:bg-black/20 rounded-full transition-colors cursor-pointer"
        >
          <X size={20} className="text-gray-800" />
        </button>

        {isLoading ? (
          <div className="flex items-center justify-center h-[300px] w-full">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
            </div>
          </div>
        ) : (
          <Link to="/events" className="block group">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              {posterUrl ? (
                <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 bg-gray-100">
                  <img
                    src={posterUrl}
                    alt={currentEvent.name}
                    className="w-full h-full object-contain md:object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 bg-blue-50 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl text-center px-4">
                    IEDC Summit 2025
                  </span>
                </div>
              )}

              <div className="flex flex-col justify-center p-5 md:p-6 min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full uppercase tracking-wider">
                    Featured Event
                  </span>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentEvent.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h3 className="text-xl md:text-2xl font-clash-display text-black leading-tight mb-2">
                      {currentEvent.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-gilroy-medium line-clamp-3 mb-4 leading-relaxed">
                      {descriptionText}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-auto flex items-center text-blue-600 text-sm font-bold font-gilroy-bold group-hover:translate-x-1 transition-transform">
                  VIEW DETAILS <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            {events.length > 1 && (
              <div className="absolute bottom-0 left-0 h-1.5 bg-blue-100 w-full">
                <motion.div
                  key={currentIndex}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-blue-600"
                />
              </div>
            )}
          </Link>
        )}
      </div>
    </div>
  );
};

export default FeaturedEventsPopup;
