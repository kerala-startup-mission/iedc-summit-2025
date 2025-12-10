import React from 'react';

export const TrainBookingForm = () => {
  const scheduleData = {
    to_kasaragod: [
      { station: 'Trivandrum', date: '21/12/25', time: '14:00', fare: '₹ 365' },
      { station: 'Kottayam', date: '21/12/25', time: '16:30 - 16:40', fare: '₹ 295' },
      { station: 'Ernakulam', date: '21/12/25', time: '18:05 - 18:10', fare: '₹ 265' },
      { station: 'Shoranur', date: '21/12/25', time: '21:05 - 21:20', fare: '₹ 220' },
      { station: 'Kasaragod', date: '22/12/25', time: '04:00', isDestination: true }
    ],
    from_kasaragod: [
      { station: 'Kasaragod', date: '22/12/25', time: '23:30', isOrigin: true },
      { station: 'Shoranur', date: '23/12/25', time: '04:50 - 05:00', fare: '₹ 220' },
      { station: 'Ernakulam', date: '23/12/25', time: '08:05 - 08:10', fare: '₹ 265' },
      { station: 'Kottayam', date: '23/12/25', time: '10:10 - 10:20', fare: '₹ 295' },
      { station: 'Trivandrum', date: '23/12/25', time: '14:30', fare: '₹ 365' }
    ]
  };

  return (
    <section className="w-full min-h-screen bg-white relative overflow-hidden py-20 px-5">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 mt-10">
            <h1 className="text-4xl md:text-6xl font-clash-display font-black text-blue-600 mb-4 text-center">
                Book Train Ticket
            </h1>
            <p className="text-center text-gray-600 mb-12 font-gilroy-medium text-lg">
                Reserve your seat for the IEDC Summit 2025 journey
            </p>

            {/* Prerequisite Card */}
            <div className="bg-blue-50/50 rounded-3xl border border-blue-100 p-8 mb-12 flex flex-col md:flex-row items-center gap-8 max-w-3xl mx-auto backdrop-blur-sm">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0 text-blue-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v22m0-2h2m-2 0H9m3-16V3m0 0L9 5m3-2l3 2M9 3v2m3-2v4M9 7h6M6 7h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2z"></path>
                    </svg>
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-clash-display font-bold text-gray-900 mb-2">
                        Summit Ticket Required
                    </h3>
                    <p className="text-gray-600 font-gilroy-medium leading-relaxed">
                        A valid <a href="https://tickets.startupmission.in/iedc-summit-2025?code=SUMMIT15" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">IEDC Summit 2025 Ticket</a> is mandatory for booking. Please keep your ticket number ready.
                    </p>
                </div>
            </div>

            {/* Coming Soon Notice */}
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-12 border border-gray-100 mb-16 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-clash-display font-bold text-gray-900 mb-4">
                        Booking Opens Soon
                    </h2>
                    <p className="text-lg text-gray-500 font-gilroy-medium max-w-2xl mx-auto">
                        We are finalizing the arrangements. The train schedule is available below for your planning.
                    </p>
                </div>
            </div>

            {/* Train Schedule */}
            <div className="grid md:grid-cols-2 gap-8 mb-15">
                {/* To Kasaragod Schedule */}
                <div className="bg-white rounded-3xl shadow-lg shadow-blue-900/5 p-8 border border-gray-100">
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-clash-display font-bold text-gray-900">
                                To Kasaragod
                            </h3>
                            <p className="text-sm text-gray-500 font-gilroy-medium">Summit Journey</p>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        {scheduleData.to_kasaragod.map((stop, index) => (
                            <div 
                                key={index} 
                                className={`relative flex items-start justify-between group ${
                                    index !== scheduleData.to_kasaragod.length - 1 ? 'pb-6 border-b border-gray-50' : ''
                                }`}
                            >
                                <div className="flex gap-4">
                                    <div className={`mt-1.5 w-3 h-3 rounded-full ring-4 ring-white ${stop.isDestination ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    <div>
                                        <p className={`font-clash-display font-semibold text-lg ${stop.isDestination ? 'text-green-600' : 'text-gray-900'}`}>
                                            {stop.station}
                                        </p>
                                        <p className="text-sm text-gray-400 font-gilroy-medium">{stop.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-gilroy-bold text-lg text-gray-900">{stop.time}</p>
                                    {stop.fare && (
                                        <p className="text-sm font-gilroy-bold text-green-600 mt-0.5">
                                            {stop.fare}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* From Kasaragod Schedule */}
                <div className="bg-white rounded-3xl shadow-lg shadow-blue-900/5 p-8 border border-gray-100">
                    <div className="flex items-center gap-4 mb-0 md:mb-8 pb-6 border-b border-gray-100">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-clash-display font-bold text-gray-900">
                                From Kasaragod
                            </h3>
                            <p className="text-sm text-gray-500 font-gilroy-medium">Return Journey</p>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        {scheduleData.from_kasaragod.map((stop, index) => (
                            <div 
                                key={index} 
                                className={`relative flex items-start justify-between group ${
                                    index !== scheduleData.from_kasaragod.length - 1 ? 'pb-6 border-b border-gray-50' : ''
                                }`}
                            >
                                <div className="flex gap-4">
                                    <div className={`mt-1.5 w-3 h-3 rounded-full ring-4 ring-white ${stop.isOrigin ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                                    <div>
                                        <p className={`font-clash-display font-semibold text-lg ${stop.isOrigin ? 'text-orange-600' : 'text-gray-900'}`}>
                                            {stop.station}
                                        </p>
                                        <p className="text-sm text-gray-400 font-gilroy-medium">{stop.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-gilroy-bold text-lg text-gray-900">{stop.time}</p>
                                    {stop.fare && (
                                        <p className="text-sm font-gilroy-bold text-green-600 mt-0.5">
                                            {stop.fare}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 absolute  bottom-0 left-0 object-cover"
      />
    </section>
  );
};
