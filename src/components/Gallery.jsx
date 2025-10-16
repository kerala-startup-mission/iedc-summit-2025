import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const summits = [
  { year: '2024', title: 'IEDC Summit 2024', location: 'NIT Calicut', videoId: 'ZeQyHm8sfC4' },
  { year: '2023', title: 'IEDC Summit 2023', location: 'College of Engineering, Trivandrum', videoId: '6Byl5JR-IpQ' },
  { year: '2023', title: 'IEDC Summit 2023', location: 'Rajagiri School of Engineering & Technology', videoId: 'w1Fr8mSf__8' },
  { year: '2022', title: 'IEDC Summit 2022', location: "St. Joseph's College of Engineering & Technology", videoId: 'fPmUPSigxrg' },
  { year: '2021', title: 'IEDC Summit 2021', location: 'Adi Shankara Institute of Engineering and Technology, Cochin', videoId: 'zxxGtCYnhD4' },
  { year: '2019', title: 'IEDC Summit 2019', location: 'Sahrdaya College of Engineering and Technology, Thrissur', videoId: 'UqKGvZuhsCU' },
  { year: '2018', title: 'IEDC Summit 2018', location: 'Amal Jyothi Engineering College, Kanjirapally', videoId: 'jzyTX9SRTpk' },
  { year: '2017', title: 'IEDC Summit 2017', location: 'ADLUX International Convention Centre, Kochi', videoId: 'XrPAxDk_dM4' },
  { year: '2016', title: 'IEDC Summit 2016', location: 'Girideepam Convention Center, Trivandrum', videoId: 'k1wGLf7s5tA' }
];

const Gallery = () => {
  const headerRef = useScrollAnimation({ y: 30, duration: 0.8, delay: 0.1 });
  const videosRef = useScrollAnimation({ y: 40, duration: 0.8, stagger: 0.1, delay: 0.3 });

  return (
    <section id="gallery" className="w-full px-5 md:px-16 lg:px-20 py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="w-full flex flex-col items-center gap-4 mb-12 md:mb-20 text-center">
          <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full">
            Our Journey
          </div>
          <h2 className="text-slate-900 text-4xl md:text-5xl font-bold font-inter leading-tight">
            Previous Summits
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mt-2">
            Relive the inspiring moments, groundbreaking ideas, and vibrant energy from our past IEDC Summits.
          </p>
        </div>

        {/* Video Grid */}
        <div ref={videosRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {summits.map((summit, index) => (
            <div
              key={`${summit.year}-${index}`}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col"
            >
              {/* Video Embed */}
              <div className="relative w-full pt-[56.25%] bg-slate-100 rounded-t-2xl overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${summit.videoId}`}
                  title={summit.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>

              {/* Summit Info */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                    {summit.year}
                  </span>
                </div>
                <h3 className="text-slate-900 text-lg font-bold leading-snug flex-grow">
                  {summit.title}
                </h3>
                <p className="text-slate-500 text-sm mt-2">
                  {summit.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
