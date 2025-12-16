import React from "react";
import { useScrollFadeInUp } from "../hooks/useScrollFadeInUp";
import { winnersData } from "../data/winners";

const Winners = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFadeInUp();

  // Get all event keys
  const eventKeys = Object.keys(winnersData);

  return (
    <section
      id="winners"
      className={`w-full bg-gray-50 py-20 relative overflow-hidden ${
        sectionVisible ? "fade-in-up-visible" : "fade-in-up-hidden"
      }`}
      ref={sectionRef}
    >
      <div className="container mx-auto px-5">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-blue-600 font-clash-display mb-4">
            Winners
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-gilroy-light max-w-2xl mx-auto">
            Celebrating the innovative minds and their groundbreaking products.
          </p>
        </div>

        {eventKeys.map((key) => {
          const eventData = winnersData[key];
          const winners = eventData.winners || [];
          
          return (
            <div key={key} className="mb-16 last:mb-0">
              <h3 className="font-clash-display font-bold text-2xl md:text-3xl text-gray-800 mb-8 text-center">
                {eventData.title} <span className="text-blue-500 text-lg md:text-xl font-medium ml-2">({eventData.type})</span>
              </h3>

              {/* Winners Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {winners.map((winner, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full relative group"
                  >
                    {/* Rank/Badge (Optional - just using index + 1 for now or a trophy icon) */}
                    <div className="absolute top-4 right-4 text-yellow-500 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 3L19 3V5H21V11C21 13.7614 18.7614 16 16 16H14.93C14.48 17.7 13.15 19.1 11.5 19.75V21H15V23H9V21H12.5V19.75C10.85 19.1 9.52 17.7 9.07 16H8C5.23858 16 3 13.7614 3 11V5H5V3ZM19 5H17V11C17 12.6569 15.6569 14 14 14H16C17.6569 14 19 12.6569 19 11V5ZM5 5V11C5 12.6569 6.34315 14 8 14H10C8.34315 14 7 12.6569 7 11V5H5Z" />
                      </svg>
                    </div>

                    <h3 className="font-clash-display font-bold text-xl text-gray-900 mb-2 pr-10">
                      {winner.product}
                    </h3>
                    
                    <div className="mt-auto space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 min-w-[20px]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Team Member</p>
                          <p className="font-gilroy-medium text-gray-700">{winner.member}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="mt-1 min-w-[20px]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">College</p>
                          <p className="font-gilroy-medium text-gray-700 text-sm">{winner.college}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="mt-1 min-w-[20px]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">District</p>
                          <p className="font-gilroy-medium text-gray-700">{winner.district}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Winners;
