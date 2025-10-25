import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';

import useScrollAnimation from '../hooks/useScrollAnimation';import useScrollAnimation from '../hooks/useScrollAnimation';

import { aboutContent } from '../data/aboutContent.jsx';import { aboutContent } from '../data/aboutContent.jsx';



const cardData = [const cardData = [

  { id: 'ksum', ...aboutContent.ksum },  { id: 'ksum', ...aboutContent.ksum },

  { id: 'iedc', ...aboutContent.iedc },  { id: 'iedc', ...aboutContent.iedc },

  { id: 'lbscek', ...aboutContent.lbscek },  { id: 'lbscek', ...aboutContent.lbscek },

  { id: 'lbsiedc', ...aboutContent.lbsiedc },  { id: 'lbsiedc', ...aboutContent.lbsiedc },

];];



const About = () => {const About = () => {

  const headerRef = useScrollAnimation({ y: 30, duration: 0.8, delay: 0.2 });  const headerRef = useScrollAnimation({ y: 30, duration: 0.8, delay: 0.2 });

  const contentRef = useScrollAnimation({ y: 40, duration: 0.8, stagger: 0.2, delay: 0.3 });  const contentRef = useScrollAnimation({ y: 40, duration: 0.8, stagger: 0.2, delay: 0.3 });

    

  const [showModal, setShowModal] = useState(false);  const [showModal, setShowModal] = useState(false);

  const [modalContent, setModalContent] = useState(null);  const [modalContent, setModalContent] = useState(null);



  useEffect(() => {  useEffect(() => {

    document.body.style.overflow = showModal ? 'hidden' : 'unset';    document.body.style.overflow = showModal ? 'hidden' : 'unset';

    return () => { document.body.style.overflow = 'unset'; };    return () => { document.body.style.overflow = 'unset'; };

  }, [showModal]);  }, [showModal]);



  const openModal = (type) => { setModalContent(type); setShowModal(true); };  const openModal = (type) => { setModalContent(type); setShowModal(true); };

  const closeModal = () => { setShowModal(false); };  const closeModal = () => { setShowModal(false); };

    

  const selectedContent = modalContent ? aboutContent[modalContent] : null;  const selectedContent = modalContent ? aboutContent[modalContent] : null;



  return (  return (

    <section id="about" className="w-full bg-white">    <section id="about" className="w-full bg-white">

      {/* Mobile Layout */}      {/* Mobile Layout */}

      <div className="md:hidden w-96 mx-auto relative overflow-hidden bg-white">      <div className="md:hidden w-96 mx-auto relative overflow-hidden bg-white">

        {/* Decorative Circles */}        {/* Decorative Circles */}

        <div className="w-60 h-60 left-[127px] top-[241px] absolute opacity-75 rounded-full border border-blue-600" />        <div className="w-60 h-60 left-[127px] top-[241px] absolute opacity-75 rounded-full border border-blue-600" />

        <div className="w-60 h-60 left-[-29px] top-[161px] absolute opacity-50 rounded-full border-[0.47px] border-blue-600" />        <div className="w-60 h-60 left-[-29px] top-[161px] absolute opacity-50 rounded-full border-[0.47px] border-blue-600" />

        <div className="w-80 h-80 left-[145px] top-[297px] absolute opacity-50 border-[0.47px] border-blue-600" />        <div className="w-80 h-80 left-[145px] top-[297px] absolute opacity-50 border-[0.47px] border-blue-600" />



        {/* Header */}        {/* Header */}

        <div className="left-[28px] top-[69px] absolute text-blue-500 text-5xl font-normal font-clash-display leading-10">About</div>        <div className="left-[28px] top-[69px] absolute text-blue-500 text-5xl font-normal font-clash-display leading-10">About</div>

        <div className="left-[67px] top-[212px] absolute text-black text-3xl font-normal font-clash-display leading-7">Decade of Innovation</div>        <div className="left-[67px] top-[212px] absolute text-black text-3xl font-normal font-clash-display leading-7">Decade of Innovation</div>



        {/* Subtitle */}        {/* Subtitle */}

        <div className="left-[93px] top-[250px] absolute opacity-50 text-center text-black text-base font-normal font-clash-display leading-4">        <div className="left-[93px] top-[250px] absolute opacity-50 text-center text-black text-base font-normal font-clash-display leading-4">

          Asia's largest summit for aspiring <br/>entrepreneurs          Asia's largest summit for aspiring <br/>entrepreneurs

        </div>        </div>



        {/* Description */}        {/* Description */}

        <div className="w-96 left-[20px] top-[305px] absolute text-justify">        <div className="w-96 left-[20px] top-[305px] absolute text-justify">

          <span className="text-black text-xl font-light font-gilroy leading-7">          <span className="text-black text-xl font-light font-gilroy leading-7">

            The IEDC Summit 2025, organised by Kerala Startup Mission and hosted by L.B.S. College of Engineering, Kasaragod, marks the 10th anniversary edition of this flagship event, celebrating a decade of fostering innovation, entrepreneurship, and technological excellence.            The IEDC Summit 2025, organised by Kerala Startup Mission and hosted by L.B.S. College of Engineering, Kasaragod, marks the 10th anniversary edition of this flagship event, celebrating a decade of fostering innovation, entrepreneurship, and technological excellence. This two-day summit invites students, aspiring entrepreneurs, innovators, and faculty to participate in a vibrant festival of ideas, collaboration, and learning. 

          </span>          </span>

          <span className="text-blue-700 text-xl font-light font-gilroy leading-7">Read more...</span>          <span className="text-blue-700 text-xl font-light font-gilroy leading-7">Read more...</span>

        </div>        </div>



        {/* Stats Blocks */}        {/* Stats Blocks */}

        <div className="w-20 h-20 left-[100px] top-[632px] absolute bg-emerald-400" />        <div className="w-20 h-20 left-[100px] top-[632px] absolute bg-emerald-400" />

        <div className="w-20 h-20 left-[20px] top-[632px] absolute bg-fuchsia-400" />        <div className="w-20 h-20 left-[20px] top-[632px] absolute bg-fuchsia-400" />

        <div className="w-20 h-20 left-[180px] top-[632px] absolute bg-blue-500" />        <div className="w-20 h-20 left-[180px] top-[632px] absolute bg-blue-500" />

        <div className="w-40 h-20 left-[260px] top-[632px] absolute bg-emerald-400" />        <div className="w-20 h-9 left-[339px] top-[741px] absolute bg-emerald-400" />

        <div className="w-20 h-20 left-[20px] top-[705px] absolute bg-amber-300" />        <div className="w-20 h-9 left-[340px] top-[705px] absolute bg-blue-500" />

        <div className="w-20 h-20 left-[100px] top-[705px] absolute bg-fuchsia-400" />        <div className="w-20 h-20 left-[339px] top-[777px] absolute bg-blue-500" />

        <div className="w-20 h-9 left-[340px] top-[705px] absolute bg-blue-500" />        <div className="w-20 h-20 left-[259px] top-[777px] absolute bg-fuchsia-400" />

        <div className="w-40 h-20 left-[180px] top-[705px] absolute bg-amber-300" />        <div className="w-20 h-20 left-[100px] top-[705px] absolute bg-fuchsia-400" />

        <div className="w-60 h-20 left-[20px] top-[778px] absolute bg-blue-500" />        <div className="w-20 h-20 left-[20px] top-[705px] absolute bg-amber-300" />

        <div className="w-20 h-9 left-[339px] top-[741px] absolute bg-emerald-400" />        <div className="w-40 h-20 left-[260px] top-[632px] absolute bg-emerald-400" />

        <div className="w-20 h-20 left-[259px] top-[777px] absolute bg-fuchsia-400" />        <div className="w-40 h-20 left-[180px] top-[705px] absolute bg-amber-300" />

        <div className="w-20 h-20 left-[339px] top-[777px] absolute bg-blue-500" />        <div className="w-60 h-20 left-[20px] top-[778px] absolute bg-blue-500" />



        {/* Stats Text */}        {/* Stats Text */}

        <div className="w-32 h-14 left-[35px] top-[784px] absolute text-white text-5xl font-medium font-clash-display">20K +</div>        <div className="w-32 h-14 left-[35px] top-[784px] absolute text-white text-5xl font-medium font-clash-display">20K +</div>

        <div className="w-44 h-4 left-[35px] top-[827px] absolute text-white text-sm font-medium font-clash-display">Aspiring Change Makers</div>        <div className="w-44 h-4 left-[35px] top-[827px] absolute text-white text-sm font-medium font-clash-display">Aspiring Change Makers</div>

        <div className="w-14 h-10 left-[35px] top-[720px] absolute text-white text-4xl font-medium font-clash-display">1K+</div>        <div className="w-14 h-10 left-[35px] top-[720px] absolute text-white text-4xl font-medium font-clash-display">1K+</div>

        <div className="w-9 h-3 left-[35px] top-[750px] absolute text-white text-[10px] font-medium font-clash-display">Nodals</div>        <div className="w-9 h-3 left-[35px] top-[750px] absolute text-white text-[10px] font-medium font-clash-display">Nodals</div>

        <div className="w-14 h-7 left-[112px] top-[719px] absolute text-white text-2xl font-medium font-clash-display">150+</div>        <div className="w-14 h-7 left-[112px] top-[719px] absolute text-white text-2xl font-medium font-clash-display">150+</div>

        <div className="w-11 h-4 left-[112px] top-[745px] absolute text-white text-[9px] font-medium font-clash-display leading-2">NEST<br/>Members</div>        <div className="w-11 h-4 left-[112px] top-[745px] absolute text-white text-[9px] font-medium font-clash-display leading-2">NEST<br/>Members</div>

        <div className="w-12 h-7 left-[195px] top-[651px] absolute text-white text-2xl font-medium font-clash-display">557</div>        <div className="w-12 h-7 left-[195px] top-[651px] absolute text-white text-2xl font-medium font-clash-display">557</div>

        <div className="w-7 h-2 left-[195px] top-[677px] absolute text-white text-[9px] font-medium font-clash-display">IEDCs</div>        <div className="w-7 h-2 left-[195px] top-[677px] absolute text-white text-[9px] font-medium font-clash-display">IEDCs</div>

        <div className="w-24 h-14 left-[196px] top-[711px] absolute text-white text-5xl font-medium font-clash-display">5K +</div>        <div className="w-24 h-14 left-[196px] top-[711px] absolute text-white text-5xl font-medium font-clash-display">5K +</div>

        <div className="w-11 h-4 left-[196px] top-[755px] absolute text-white text-sm font-medium font-clash-display">Leads</div>        <div className="w-11 h-4 left-[196px] top-[755px] absolute text-white text-sm font-medium font-clash-display">Leads</div>

        <div className="w-16 h-9 left-[267px] top-[794px] absolute text-white text-3xl font-medium font-clash-display">5K +</div>        <div className="w-16 h-9 left-[267px] top-[794px] absolute text-white text-3xl font-medium font-clash-display">5K +</div>

        <div className="w-6 h-2.5 left-[267px] top-[824px] absolute text-white text-[9px] font-medium font-clash-display">Ideas</div>        <div className="w-6 h-2.5 left-[267px] top-[824px] absolute text-white text-[9px] font-medium font-clash-display">Ideas</div>

        <div className="w-16 h-7 left-[347px] top-[797px] absolute text-white text-2xl font-medium font-clash-display">350+</div>        <div className="w-16 h-7 left-[347px] top-[797px] absolute text-white text-2xl font-medium font-clash-display">350+</div>

        <div className="w-14 h-2.5 left-[347px] top-[821px] absolute text-white text-[8px] font-medium font-clash-display">Pre Incubatees</div>        <div className="w-14 h-2.5 left-[347px] top-[821px] absolute text-white text-[8px] font-medium font-clash-display">Pre Incubatees</div>

        <div className="w-8 h-7 left-[347px] top-[743px] absolute text-white text-2xl font-medium font-clash-display">25</div>        <div className="w-8 h-7 left-[347px] top-[743px] absolute text-white text-2xl font-medium font-clash-display">25</div>

        <div className="w-14 h-2.5 left-[347px] top-[767px] absolute text-white text-[8px] font-medium font-clash-display">TBIs/ Coworks</div>        <div className="w-14 h-2.5 left-[347px] top-[767px] absolute text-white text-[8px] font-medium font-clash-display">TBIs/ Coworks</div>

        <div className="w-16 h-7 left-[347px] top-[707px] absolute text-white text-2xl font-medium font-clash-display">250+</div>        <div className="w-16 h-7 left-[347px] top-[707px] absolute text-white text-2xl font-medium font-clash-display">250+</div>

        <div className="w-9 h-2.5 left-[347px] top-[730px] absolute text-white text-[8px] font-medium font-clash-display">Startups</div>        <div className="w-9 h-2.5 left-[347px] top-[730px] absolute text-white text-[8px] font-medium font-clash-display">Startups</div>

        <div className="w-10 h-11 left-[116px] top-[643px] absolute text-white text-4xl font-medium font-clash-display">14</div>        <div className="w-10 h-11 left-[116px] top-[643px] absolute text-white text-4xl font-medium font-clash-display">14</div>

        <div className="w-12 h-3.5 left-[116px] top-[680px] absolute text-white text-xs font-medium font-clash-display">Clusters</div>        <div className="w-12 h-3.5 left-[116px] top-[680px] absolute text-white text-xs font-medium font-clash-display">Clusters</div>

        <div className="w-14 h-8 left-[35px] top-[644px] absolute text-white text-3xl font-medium font-clash-display">70+</div>        <div className="w-14 h-8 left-[35px] top-[644px] absolute text-white text-3xl font-medium font-clash-display">70+</div>

        <div className="w-14 h-5 left-[35px] top-[673px] absolute text-white text-[8px] font-medium font-clash-display leading-5">Cluster<br/>Coordinators</div>        <div className="w-14 h-5 left-[35px] top-[673px] absolute text-white text-[8px] font-medium font-clash-display leading-5">Cluster<br/>Co ordinators</div>

        <div className="w-32 h-11 left-[276px] top-[644px] absolute text-white text-4xl font-medium font-clash-display">1 lakh +</div>        <div className="w-32 h-11 left-[276px] top-[644px] absolute text-white text-4xl font-medium font-clash-display">1 lakh +</div>

        <div className="w-16 h-3.5 left-[276px] top-[679px] absolute text-white text-xs font-medium font-clash-display">Innovators</div>        <div className="w-16 h-3.5 left-[276px] top-[679px] absolute text-white text-xs font-medium font-clash-display">Innovators</div>



        {/* Colored Blocks */}        {/* Colored Blocks */}

        <div className="w-[1063px] h-16 left-0 top-[885px] absolute inline-flex justify-start items-start overflow-hidden">        <div className="w-[1063px] h-16 left-0 top-[885px] absolute inline-flex justify-start items-start overflow-hidden">

          <div className="w-0 h-16 origin-top-left -rotate-90 bg-blue-500" />          <div className="w-0 h-16 origin-top-left -rotate-90 bg-blue-500" />

          <div className="w-16 h-16 bg-emerald-400" />          <div className="w-16 h-16 bg-emerald-400" />

          <div className="w-16 h-16 origin-top-left -rotate-180 bg-amber-300" />          <div className="w-16 h-16 origin-top-left -rotate-180 bg-amber-300" />

          <div className="w-16 h-16 bg-amber-300" />          <div className="w-16 h-16 bg-amber-300" />

          <div className="w-0 h-16 origin-top-left rotate-90 bg-emerald-400" />          <div className="w-0 h-16 origin-top-left rotate-90 bg-emerald-400" />

          <div className="w-16 h-16 bg-amber-300" />          <div className="w-16 h-16 bg-amber-300" />

          <div className="w-0 h-16 origin-top-left -rotate-90 bg-blue-500" />          <div className="w-0 h-16 origin-top-left -rotate-90 bg-blue-500" />

          <div className="w-0 h-16 origin-top-left -rotate-90 bg-amber-300" />          <div className="w-0 h-16 origin-top-left -rotate-90 bg-amber-300" />

          <div className="w-16 h-16 bg-fuchsia-400" />          <div className="w-16 h-16 bg-fuchsia-400" />

          <div className="w-10 h-16 bg-amber-300" />          <div className="w-10 h-16 bg-amber-300" />

        </div>        </div>

      </div>      </div>



      {/* Desktop Layout */}      {/* Desktop Layout */}

      <div className="hidden md:block px-5 md:px-16 lg:px-20 py-16 md:py-24 bg-white md:bg-blue-50/50">      <div className="hidden md:block px-5 md:px-16 lg:px-20 py-16 md:py-24 bg-white md:bg-blue-50/50">

        <div className="max-w-7xl mx-auto">        <div className="max-w-7xl mx-auto">

          {/* Section Header */}          {/* Section Header */}

          <div ref={headerRef} className="w-full flex flex-col items-center gap-4 mb-12 md:mb-20 text-center">          <div className="w-full flex flex-col items-center gap-4 mb-12 md:mb-20 text-center">

            <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full">            <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full">

              About the Summit              About the Summit

            </div>            </div>

            <h2 className="text-slate-900 text-5xl font-bold font-clash-display leading-tight">            <h2 className="text-slate-900 text-5xl font-bold font-clash-display leading-tight">

              A Decade of Innovation              A Decade of Innovation

            </h2>            </h2>

            <div className="w-full max-w-3xl pt-1">            <div className="w-full max-w-3xl pt-1">

              <p className="text-blue-600 text-xl font-medium font-clash-display">              <p className="text-blue-600 text-xl font-medium font-clash-display">

                Asia's largest summit for aspiring entrepreneurs                Asia's largest summit for aspiring entrepreneurs

              </p>              </p>

              <p className="text-slate-500 text-lg leading-relaxed mt-2 font-gilroy-light">              <p className="text-slate-500 text-lg leading-relaxed mt-2 font-gilroy-light">

                The IEDC Summit 2025 marks the 10th anniversary of Asia's largest summit for aspiring entrepreneurs, celebrating innovation, collaboration, and technological excellence.                The IEDC Summit 2025 marks the 10th anniversary of Asia's largest summit for aspiring entrepreneurs, celebrating innovation, collaboration, and technological excellence.

              </p>              </p>

            </div>            </div>

          </div>          </div>



          {/* Main Summit Section */}          {/* Main Summit Section */}

          <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">

            <div className="flex flex-col gap-6">            <div className="flex flex-col gap-6">

              <h3 className="text-slate-900 text-3xl font-bold font-clash-display">              <h3 className="text-slate-900 text-3xl font-bold font-clash-display">

                {aboutContent.summit.title}                {aboutContent.summit.title}

              </h3>              </h3>

              <p className="text-slate-600 text-lg text-justify leading-relaxed font-gilroy-light">              <p className="text-slate-600 text-lg text-justify leading-relaxed font-gilroy-light">

                {aboutContent.summit.shortDescription}                {aboutContent.summit.shortDescription}

              </p>              </p>

              <button              <button

                onClick={() => openModal('summit')}                onClick={() => openModal('summit')}

                className="text-blue-600 text-base font-semibold hover:text-blue-700 transition-colors self-start"                className="text-blue-600 text-base font-semibold hover:text-blue-700 transition-colors self-start"

              >              >

                Read More →                Read More →

              </button>              </button>

            </div>            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">

              <img               <img 

                src="/iedc-about.webp"                 src="/iedc-about.webp" 

                alt="IEDC Summit"                 alt="IEDC Summit" 

                className="w-full h-full object-cover"                className="w-full h-full object-cover"

              />              />

            </div>            </div>

          </div>          </div>



          {/* Organization Cards */}          {/* Organization Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {cardData.map(card => (            {cardData.map(card => (

              <div key={card.id} className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col gap-4 relative">              <div key={card.id} className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col gap-4 relative">

                <img src={card.logo} alt={`${card.title} Logo`} className="absolute top-3 right-6 h-16 w-auto object-contain opacity-80" />                <img src={card.logo} alt={`${card.title} Logo`} className="absolute top-3 right-6 h-16 w-auto object-contain opacity-80" />

                <div className="pr-20">                <div className="pr-20">

                  <h4 className="text-slate-900 text-2xl font-bold font-clash-display">{card.title}</h4>                  <h4 className="text-slate-900 text-2xl font-bold font-clash-display">{card.title}</h4>

                </div>                </div>

                <p className="text-slate-600 leading-relaxed text-justify flex-grow font-gilroy-light">                <p className="text-slate-600 leading-relaxed text-justify flex-grow font-gilroy-light">

                  {card.shortDescription}                  {card.shortDescription}

                </p>                </p>

                <button                <button

                  onClick={() => openModal(card.id)}                  onClick={() => openModal(card.id)}

                  className="text-blue-600 text-base font-semibold hover:text-blue-700 transition-colors self-start mt-2"                  className="text-blue-600 text-base font-semibold hover:text-blue-700 transition-colors self-start mt-2"

                >                >

                  Read More →                  Read More →

                </button>                </button>

              </div>              </div>

            ))}            ))}

          </div>          </div>

        </div>

          {/* Modal */}

          {showModal && selectedContent && (        {/* Modal */}

            <div         {showModal && selectedContent && (

              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"          <div 

              onClick={closeModal}            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"

            >            onClick={closeModal}

              <div           >

                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col"            <div 

                onClick={(e) => e.stopPropagation()}              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col"

              >              onClick={(e) => e.stopPropagation()}

                <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-6 md:px-8 py-5 flex items-center justify-between rounded-t-2xl z-10">            >

                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">{selectedContent.title}</h3>              <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-6 md:px-8 py-5 flex items-center justify-between rounded-t-2xl z-10">

                  <button                <h3 className="text-xl md:text-2xl font-bold text-slate-900">{selectedContent.title}</h3>

                    onClick={closeModal}                <button

                    className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"                  onClick={closeModal}

                  >                  className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"

                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>                >

                  </button>                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>

                </div>                </button>

                <div className="overflow-y-auto px-6 md:px-8 py-8">              </div>

                  {selectedContent.fullDescription}              <div className="overflow-y-auto px-6 md:px-8 py-8">

                </div>                {selectedContent.fullDescription}

                <div className="sticky bottom-0 bg-slate-50/80 backdrop-blur-lg border-t border-slate-200 px-6 py-4 flex justify-end rounded-b-2xl">              </div>

                  <button              <div className="sticky bottom-0 bg-slate-50/80 backdrop-blur-lg border-t border-slate-200 px-6 py-4 flex justify-end rounded-b-2xl">

                    onClick={closeModal}                <button

                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"                  onClick={closeModal}

                  >                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"

                    Close                >

                  </button>                  Close

                </div>                </button>

              </div>              </div>

            </div>            </div>

          )}          </div>

        </div>        )}

      </div>      </div>

    </section>    </section>

  );  );

};    </section>

  );

export default About;};


export default About;