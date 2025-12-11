import React, { useState, useEffect } from 'react';

export const TrainBookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    ticketNumber: '',
    route: '', 
    station: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  
  // State for seat counts
  const [seatCounts, setSeatCounts] = useState({ to: 0, from: 0 });
  const MAX_SEATS = 1080;

  // REPLACE WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz7Q3r0XxrH6SIzuHUwftU_iunSmlMGwfgwIQcuy24ut7ua5M5sQ3LVLkkr7Y5-4Ql68A/exec"; 

  // Fetch seat counts on page load
  useEffect(() => {
    const fetchCounts = async () => {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL);
            const data = await response.json();
            if (data.result === 'success') {
                setSeatCounts({ to: data.toCount, from: data.fromCount });
            }
        } catch (error) {
            console.error("Failed to fetch seat counts", error);
        }
    };
    fetchCounts();
  }, []);

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

  // RESTORED PAYMENT LINKS
  const paymentLinks = {
    to_kasaragod: {
      'Trivandrum': 'https://tickets.startupmission.in/iedcsummit25-stt-tvm-kgq',
      'Kottayam': 'https://tickets.startupmission.in/iedcsummit25-stt-ktym-kgq',
      'Ernakulam': 'https://tickets.startupmission.in/iedcsummit25-stt-ern-kgq',
      'Shoranur': 'https://tickets.startupmission.in/iedcsummit25-stt-srr-kgq'
    },
    from_kasaragod: {
      'Shoranur': 'https://tickets.startupmission.in/iedcsummit25-stt-kgq-srr',
      'Ernakulam': 'https://tickets.startupmission.in/iedcsummit25-stt-kgq-ern',
      'Kottayam': 'https://tickets.startupmission.in/iedcsummit25-stt-kgq-ktym',
      'Trivandrum': 'https://tickets.startupmission.in/iedcsummit25-stt-kgq-tvm'
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setError('');

    if (!formData.ticketNumber) {
        setError('Please enter your ticket number');
        setVerifying(false);
        return;
    }

    try {
        const response = await fetch(`https://tickets.startupmission.in/api/webhook/verify/iedc-summit-2025?code=${formData.ticketNumber}`);
        const data = await response.json();

        if (response.ok && data.name) {
            setIsVerified(true);
            setFormData(prev => ({
                ...prev,
                name: data.name || prev.name
            }));
        } else {
            setError('Invalid ticket number. Please check and try again.');
        }
    } catch (err) {
        console.error(err);
        setError('Verification failed. Please try again later.');
    } finally {
        setVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.route || !formData.station) {
        setError('Please select a journey and station');
        setLoading(false);
        return;
    }

    try {
      const params = new URLSearchParams();
      params.append('route', formData.route);
      params.append('name', formData.name);
      params.append('ticketNumber', formData.ticketNumber);
      params.append('station', formData.station);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: params
      });
      
      const result = await response.json();

      if (result.result === 'error') {
        // If Duplicate or Full
        setError(result.message);
        setLoading(false);
      } else {
        // SUCCESS: REDIRECT TO PAYMENT
        const link = paymentLinks[formData.route]?.[formData.station];
        
        if (link) {
            window.location.href = link;
        } else {
            setError('Payment link not configured for this station.');
            setLoading(false);
        }
      }

    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const getStations = () => {
    if (!formData.route) return [];
    const routeData = scheduleData[formData.route];
    return routeData.filter(s => s.fare);
  };

  // Helper to check if route is full
  const isToFull = seatCounts.to >= MAX_SEATS;
  const isFromFull = seatCounts.from >= MAX_SEATS;

  return (
    <section className="w-full min-h-screen bg-white relative overflow-hidden py-20 px-5">
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
                        A valid <a href="https://tickets.startupmission.in/iedc-summit-2025?code=SUMMIT15" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">IEDC Summit 2025 Ticket</a> is mandatory.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 md:p-12 border border-gray-100 mb-16 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                
                {!isVerified ? (
                    <form onSubmit={handleVerify} className="space-y-6 relative z-10">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-clash-display font-bold text-gray-900 mb-2">Verify Your Ticket</h3>
                            <p className="text-gray-500 font-gilroy-medium">Enter your IEDC Summit ticket number</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-gilroy-bold text-gray-700">Summit Ticket Number</label>
                            <input 
                                type="text" 
                                name="ticketNumber"
                                required
                                value={formData.ticketNumber}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-gilroy-medium text-center text-lg tracking-wider uppercase"
                                placeholder="IE-XXXX-XXXX"
                            />
                        </div>
                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-gilroy-medium text-center animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={verifying}
                            className="w-full py-4 rounded-xl font-clash-display font-bold text-lg text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"
                        >
                            {verifying ? 'Verifying...' : 'Verify Ticket'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                            <div>
                                <h3 className="text-xl font-clash-display font-bold text-gray-900">Passenger Details</h3>
                                <p className="text-sm text-green-600 font-gilroy-bold flex items-center gap-1 mt-1">
                                    Ticket Verified
                                </p>
                            </div>
                            <button type="button" onClick={() => setIsVerified(false)} className="text-sm text-gray-400 hover:text-gray-600 underline font-gilroy-medium">
                                Change Ticket
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-gilroy-bold text-gray-700">Full Name</label>
                                <input type="text" value={formData.name} disabled className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 font-gilroy-medium cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-gilroy-bold text-gray-700">Summit Ticket Number</label>
                                <input type="text" value={formData.ticketNumber} disabled className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 font-gilroy-medium cursor-not-allowed" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-gilroy-bold text-gray-700">Select Journey</label>
                            <div className="grid grid-cols-2 gap-4">
                                {/* TO KASARAGOD BUTTON */}
                                <button
                                    type="button"
                                    disabled={isToFull}
                                    onClick={() => setFormData({ ...formData, route: 'to_kasaragod', station: '' })}
                                    className={`p-4 rounded-xl border-2 transition-all text-center relative overflow-hidden ${
                                        isToFull 
                                        ? 'bg-gray-100 border-gray-200 opacity-80 cursor-not-allowed'
                                        : formData.route === 'to_kasaragod'
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                                    }`}
                                >
                                    {isToFull && (
                                        <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                            SOLD OUT
                                        </div>
                                    )}
                                    <span className="block font-clash-display font-bold mb-1">To Kasaragod</span>
                                    <span className="text-xs">Dec 21</span>
                                    {isToFull && <span className="block text-xs text-red-500 font-bold mt-1">Booking Closed</span>}
                                </button>

                                {/* FROM KASARAGOD BUTTON */}
                                <button
                                    type="button"
                                    disabled={isFromFull}
                                    onClick={() => setFormData({ ...formData, route: 'from_kasaragod', station: '' })}
                                    className={`p-4 rounded-xl border-2 transition-all text-center relative overflow-hidden ${
                                        isFromFull 
                                        ? 'bg-gray-100 border-gray-200 opacity-80 cursor-not-allowed'
                                        : formData.route === 'from_kasaragod'
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                                    }`}
                                >
                                    {isFromFull && (
                                        <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                            SOLD OUT
                                        </div>
                                    )}
                                    <span className="block font-clash-display font-bold mb-1">From Kasaragod</span>
                                    <span className="text-xs">Dec 22</span>
                                    {isFromFull && <span className="block text-xs text-red-500 font-bold mt-1">Booking Closed</span>}
                                </button>
                            </div>
                        </div>

                        {/* ONLY SHOW STATION SELECTOR IF ROUTE IS SELECTED */}
                        {formData.route && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                <label className="text-sm font-gilroy-bold text-gray-700">Select Station</label>
                                <select
                                    name="station"
                                    required
                                    value={formData.station}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-gilroy-medium appearance-none"
                                >
                                    <option value="">Select a station</option>
                                    {getStations().map((stop, index) => (
                                        <option key={index} value={stop.station}>
                                            {stop.station} - {stop.fare} ({stop.time})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-gilroy-medium text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !formData.route || !formData.station}
                            className={`w-full py-4 rounded-xl font-clash-display font-bold text-lg text-white transition-all ${
                                (loading || !formData.route || !formData.station)
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                            }`}
                        >
                            {loading ? 'Processing...' : 'Proceed to Payment'}
                        </button>
                    </form>
                )}
            </div>

            {/* TRAIN SCHEDULE DISPLAY */}
            <div className="grid md:grid-cols-2 gap-8 mb-15">
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
                            <div key={index} className={`relative flex items-start justify-between group ${index !== scheduleData.to_kasaragod.length - 1 ? 'pb-6 border-b border-gray-50' : ''}`}>
                                <div className="flex gap-4">
                                    <div className={`mt-1.5 w-3 h-3 rounded-full ring-4 ring-white ${stop.isDestination ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    <div>
                                        <p className={`font-clash-display font-semibold text-lg ${stop.isDestination ? 'text-green-600' : 'text-gray-900'}`}>{stop.station}</p>
                                        <p className="text-sm text-gray-400 font-gilroy-medium">{stop.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-gilroy-bold text-lg text-gray-900">{stop.time}</p>
                                    {stop.fare && <p className="text-sm font-gilroy-bold text-green-600 mt-0.5">{stop.fare}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

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
                            <div key={index} className={`relative flex items-start justify-between group ${index !== scheduleData.from_kasaragod.length - 1 ? 'pb-6 border-b border-gray-50' : ''}`}>
                                <div className="flex gap-4">
                                    <div className={`mt-1.5 w-3 h-3 rounded-full ring-4 ring-white ${stop.isOrigin ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                                    <div>
                                        <p className={`font-clash-display font-semibold text-lg ${stop.isOrigin ? 'text-orange-600' : 'text-gray-900'}`}>{stop.station}</p>
                                        <p className="text-sm text-gray-400 font-gilroy-medium">{stop.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-gilroy-bold text-lg text-gray-900">{stop.time}</p>
                                    {stop.fare && <p className="text-sm font-gilroy-bold text-green-600 mt-0.5">{stop.fare}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <img src="/hero-blocks.png" alt="Decorative blocks" className="w-full h-20 sm:h-24 absolute bottom-0 left-0 object-cover" />
    </section>
  );
};
