import React from 'react';

export const TrainBookingForm = () => {
  const scheduleData = {
    to_kasaragod: [
      { station: 'Trivandrum', date: '21/12/25', time: '14:00' },
      { station: 'Kottayam', date: '21/12/25', time: '16:30 - 16:40' },
      { station: 'Ernakulam', date: '21/12/25', time: '18:05 - 18:10' },
      { station: 'Shoranur', date: '21/12/25', time: '21:05 - 21:20' },
      { station: 'Kasaragod', date: '22/12/25', time: '04:00', isDestination: true }
    ],
    from_kasaragod: [
      { station: 'Kasaragod', date: '22/12/25', time: '23:30', isOrigin: true },
      { station: 'Shoranur', date: '23/12/25', time: '04:50 - 05:00' },
      { station: 'Ernakulam', date: '23/12/25', time: '08:05 - 08:10' },
      { station: 'Kottayam', date: '23/12/25', time: '10:10 - 10:20' },
      { station: 'Trivandrum', date: '23/12/25', time: '14:30' }
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
                Book a Train
            </h1>
            <p className="text-center text-gray-600 mb-12 font-gilroy-medium text-lg">
                Reserve your seat for the IEDC Summit 2025 journey
            </p>

            {/* Coming Soon Notice */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl shadow-2xl p-8 md:p-12 border border-blue-100 backdrop-blur-sm bg-opacity-90 mb-12">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-clash-display font-bold text-blue-900">
                        Booking Opens Soon!
                    </h2>
                    <p className="text-lg text-gray-600 font-gilroy-medium max-w-2xl mx-auto">
                        Train ticket booking will be available shortly. Check out the schedule below to plan your journey.
                    </p>
                </div>
            </div>

            {/* Train Schedule */}
            <div className="space-y-8">
                {/* To Kasaragod Schedule */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-clash-display font-bold text-gray-800">
                            To Kasaragod (Summit)
                        </h3>
                    </div>
                    
                    <div className="space-y-4">
                        {scheduleData.to_kasaragod.map((stop, index) => (
                            <div 
                                key={index} 
                                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                                    stop.isDestination 
                                        ? 'bg-green-50 border-2 border-green-200' 
                                        : 'bg-gray-50 hover:bg-gray-100'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-3 h-3 rounded-full ${stop.isDestination ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                    <div>
                                        <p className="font-clash-display font-semibold text-lg text-gray-800">
                                            {stop.station}
                                        </p>
                                        <p className="text-sm text-gray-500 font-gilroy-regular">{stop.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-gilroy-bold text-lg text-blue-600">{stop.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* From Kasaragod Schedule */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-clash-display font-bold text-gray-800">
                            From Kasaragod (Return)
                        </h3>
                    </div>
                    
                    <div className="space-y-4">
                        {scheduleData.from_kasaragod.map((stop, index) => (
                            <div 
                                key={index} 
                                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                                    stop.isOrigin 
                                        ? 'bg-orange-50 border-2 border-orange-200' 
                                        : 'bg-gray-50 hover:bg-gray-100'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-3 h-3 rounded-full ${stop.isOrigin ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                                    <div>
                                        <p className="font-clash-display font-semibold text-lg text-gray-800">
                                            {stop.station}
                                        </p>
                                        <p className="text-sm text-gray-500 font-gilroy-regular">{stop.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-gilroy-bold text-lg text-blue-600">{stop.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};
