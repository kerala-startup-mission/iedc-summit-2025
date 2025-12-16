import React from 'react';
import { X } from 'lucide-react';

const EventWinnersModal = ({ isOpen, onClose, eventTitle, winners = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h3 className="text-2xl font-clash-display font-bold text-blue-600">
              Winners - {eventTitle}
            </h3>
            <p className="text-sm text-gray-500 font-gilroy-medium">
              Celebrating the top innovators
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {winners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {winners.map((winner, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow duration-300 relative group"
                >
                   <div className="absolute top-3 right-3 text-yellow-500 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 3L19 3V5H21V11C21 13.7614 18.7614 16 16 16H14.93C14.48 17.7 13.15 19.1 11.5 19.75V21H15V23H9V21H12.5V19.75C10.85 19.1 9.52 17.7 9.07 16H8C5.23858 16 3 13.7614 3 11V5H5V3ZM19 5H17V11C17 12.6569 15.6569 14 14 14H16C17.6569 14 19 12.6569 19 11V5ZM5 5V11C5 12.6569 6.34315 14 8 14H10C8.34315 14 7 12.6569 7 11V5H5Z" />
                      </svg>
                    </div>

                  <h4 className="font-clash-display font-bold text-lg text-gray-900 mb-3 pr-8 leading-tight">
                    {winner.product}
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 min-w-[16px]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Team Member</p>
                        <p className="font-gilroy-medium text-sm text-gray-700">{winner.member}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 min-w-[16px]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">College</p>
                        <p className="font-gilroy-medium text-sm text-gray-700">{winner.college}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 min-w-[16px]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">District</p>
                        <p className="font-gilroy-medium text-sm text-gray-700">{winner.district}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 font-gilroy-medium">No winners announced yet.</p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-gilroy-medium transition-colors"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default EventWinnersModal;
