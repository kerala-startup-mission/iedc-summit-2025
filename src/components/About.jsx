import React, { useState, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { aboutContent } from '../data/aboutContent.jsx';

const cardData = [
  { id: 'ksum', ...aboutContent.ksum },
  { id: 'iedc', ...aboutContent.iedc },
  { id: 'lbscek', ...aboutContent.lbscek },
  { id: 'lbsiedc', ...aboutContent.lbsiedc },
];

const About = () => {
  const headerRef = useScrollAnimation({ y: 30, duration: 0.8, delay: 0.2 });
  const contentRef = useScrollAnimation({ y: 40, duration: 0.8, stagger: 0.2, delay: 0.3 });
  
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showModal]);

  const openModal = (type) => { setModalContent(type); setShowModal(true); };
  const closeModal = () => { setShowModal(false); };
  
  const selectedContent = modalContent ? aboutContent[modalContent] : null;

  return (
    <section id="about" className="w-full px-5 md:px-16 lg:px-20 py-16 md:py-24 bg-white md:bg-blue-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="w-full flex flex-col items-center gap-4 mb-12 md:mb-20 text-center">
          <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full">
            About the Summit
          </div>
          <h2 className="text-slate-900 text-4xl md:text-5xl font-bold font-inter leading-tight">
            A Decade of Innovation
          </h2>
          <div className="w-full max-w-3xl pt-1">
            <p className="text-blue-600 text-lg md:text-xl font-medium font-inter">
              Asia's largest summit for aspiring entrepreneurs
            </p>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed mt-2">
              The IEDC Summit 2025 marks the 10th anniversary of Asia's largest summit for aspiring entrepreneurs, celebrating innovation, collaboration, and technological excellence.
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div ref={contentRef} className="hidden md:block">
          {/* Main Summit Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="flex flex-col gap-6">
              <h3 className="text-slate-900 text-3xl font-bold">
                {aboutContent.summit.title}
              </h3>
              <p className="text-slate-600 text-lg text-justify leading-relaxed">
                {aboutContent.summit.shortDescription}
              </p>
              <button
                onClick={() => openModal('summit')}
                className="text-blue-600 text-base font-semibold hover:text-blue-700 transition-colors self-start"
              >
                Read More →
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">
              <img 
                src="/iedc-about.webp" 
                alt="IEDC Summit" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Organization Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cardData.map(card => (
              <div key={card.id} className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col gap-4 relative">
                <img src={card.logo} alt={`${card.title} Logo`} className="absolute top-3 right-6 h-16 w-auto object-contain opacity-80" />
                <div className="pr-20">
                  <h4 className="text-slate-900 text-2xl font-bold">{card.title}</h4>
                </div>
                <p className="text-slate-600 leading-relaxed text-justify flex-grow">
                  {card.shortDescription}
                </p>
                <button
                  onClick={() => openModal(card.id)}
                  className="text-blue-600 text-base font-semibold hover:text-blue-700 transition-colors self-start mt-2"
                >
                  Read More →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-10">
          {/* Main Summit Section */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl overflow-hidden shadow-md border-2 border-white mb-4">
              <img src="/iedc-about.webp" alt="IEDC Summit" className="w-full h-auto object-cover" />
            </div>
            <h3 className="text-slate-900 text-2xl font-bold">{aboutContent.summit.title}</h3>
            <p className="text-slate-600 leading-relaxed">{aboutContent.summit.shortDescription}</p>
            <button onClick={() => openModal('summit')} className="text-blue-600 font-semibold self-start">Read More →</button>
          </div>

          {/* Organization Cards */}
          {cardData.map(card => (
            <div key={card.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-3 relative">
              <img src={card.logo} alt={`${card.title} Logo`} className="absolute top-2 right-5 h-14 w-auto object-contain opacity-80" />
              <div className="pr-16">
                <h4 className="text-slate-900 text-xl font-bold">{card.title}</h4>
              </div>
              <p className="text-slate-600 text-justify leading-relaxed">{card.shortDescription}</p>
              <button onClick={() => openModal(card.id)} className="text-blue-600 font-semibold self-start mt-1">Read More →</button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && selectedContent && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-6 md:px-8 py-5 flex items-center justify-between rounded-t-2xl z-10">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">{selectedContent.title}</h3>
                <button
                  onClick={closeModal}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="overflow-y-auto px-6 md:px-8 py-8">
                {selectedContent.fullDescription}
              </div>
              <div className="sticky bottom-0 bg-slate-50/80 backdrop-blur-lg border-t border-slate-200 px-6 py-4 flex justify-end rounded-b-2xl">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;