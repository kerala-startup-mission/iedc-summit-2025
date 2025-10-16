import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Gallery = () => {
  const headerRef = useScrollAnimation({ y: 30, duration: 0.8, delay: 0.1 });
  const videosRef = useScrollAnimation({ y: 40, duration: 0.8, stagger: 0.2, delay: 0.3 });
  const summits = [
    {
      year: '2024',
      title: 'IEDC Summit 2024',
      location: 'NIT Calicut',
      videoId: 'ZeQyHm8sfC4'
    },
    {
      year: '2023',
      title: 'IEDC Summit 2023',
      location: 'College of Engineering, Trivandrum',
      videoId: '6Byl5JR-IpQ'
    },
    {
      year: '2023',
      title: 'IEDC Summit 2023',
      location: 'Rajagiri School of Engineering & Technology',
      videoId: 'w1Fr8mSf__8'
    },
    {
      year: '2022',
      title: 'IEDC Summit 2022',
      location: "St. Joseph's College of Engineering & Technology",
      videoId: 'fPmUPSigxrg' // Replace with actual video ID
    },
    {
      year: '2021',
      title: 'IEDC Summit 2021',
      location: 'Adi Shankara Institute of Engineering and Technology, Cochin',
      videoId: 'zxxGtCYnhD4' // Replace with actual video ID
    },
    {
      year: '2019',
      title: 'IEDC Summit 2019',
      location: 'Sahrdaya College of Engineering and Technology, Thrissur',
      videoId: 'UqKGvZuhsCU' // Replace with actual video ID
    },
    {
      year: '2018',
      title: 'IEDC Summit 2018',
      location: 'Amal Jyothi Engineering College, Kanjirapally',
      videoId: 'jzyTX9SRTpk' // Replace with actual video ID
    },
    {
      year: '2017',
      title: 'IEDC Summit 2017',
      location: 'ADLUX International Convention Centre, Kochi',
      videoId: 'XrPAxDk_dM4' // Replace with actual video ID
    },
    {
      year: '2016',
      title: 'IEDC Summit 2016',
      location: 'Girideepam Convention Center, Trivandrum',
      videoId: 'k1wGLf7s5tA' // Replace with actual video ID
    }
  ];

  return (
    <section id="gallery" className="w-full px-4 sm:px-8 md:px-12 py-12 md:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Previous Summits
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Relive the inspiring moments from our past IEDC Summits
          </p>
        </div>

        {/* Video Grid - 3 columns */}
        <div ref={videosRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {summits.map((summit, index) => (
            <div
              key={`${summit.year}-${index}`}
              className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
            >
              {/* Video Embed */}
              <div className="relative w-full pt-[56.25%] bg-gray-100">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${summit.videoId}`}
                  title={summit.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Summit Info */}
              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                    {summit.year}
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {summit.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
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
