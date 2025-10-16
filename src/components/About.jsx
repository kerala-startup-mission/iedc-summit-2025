import React, { useState, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

// --- Data remains the same, but I've updated classNames for better text styling ---
const aboutContent = {
  summit: {
    title: 'About the Summit',
    shortDescription: 'The IEDC Summit 2025, organised by Kerala Startup Mission and hosted by L.B.S. College of Engineering, Kasaragod, marks the 10th anniversary edition of this flagship event, celebrating a decade of fostering innovation, entrepreneurship, and technological excellence.',
    fullDescription: (
      // Added a base class for consistent modal text styling
      <div className="text-slate-600 leading-relaxed space-y-4">
        <p>The IEDC Summit 2025, organised by Kerala Startup Mission and hosted by L.B.S. College of Engineering, Kasaragod, marks the 10th anniversary edition of this flagship event, celebrating a decade of fostering innovation, entrepreneurship, and technological excellence. This two-day summit invites students, aspiring entrepreneurs, innovators, and faculty to participate in a vibrant festival of ideas, collaboration, and learning.</p>
        <p>As one of the region's most anticipated events, the summit provides a dynamic platform for interactive workshops, panel discussions, seminars, and keynote sessions led by industry experts and successful entrepreneurs. Participants will gain valuable insights into emerging trends, develop entrepreneurial skills, and explore opportunities to transform ideas into impactful ventures.</p>
        <p>By bringing together diverse minds under one roof, the IEDC Summit 2025 provides a unique space for networking, knowledge sharing, and skill development. L.B.S. College of Engineering, Kasaragod reaffirms its commitment to empowering the next generation of innovators and advancing the spirit of entrepreneurship, creativity, and technological growth across the region.</p>
      </div>
    ),
  },
  ksum: {
    title: 'About KSUM',
    logo: '/ksum-logo-black.png',
    shortDescription: 'The Kerala Startup Mission (KSUM) is the nodal agency of the government of Kerala for promoting entrepreneurship in the state. It is also the implementing body for the Kerala Technology Startup Policy.',
    fullDescription: (
      <div className="text-slate-600 leading-relaxed space-y-4">
        <p>The Kerala Startup Mission (KSUM) is the nodal agency of the government of Kerala for promoting entrepreneurship in the state. It is also the implementing body for the Kerala Technology Startup Policy that supports the state's startup ecosystem through the various schemes and support programs. KSUM was founded in 2006, with the goal to promote technology-based entrepreneurship activities and to create the infrastructure and ecosystem required to support high-end technology-based startup businesses.</p>
        <p>KSUM acts as a springboard for budding entrepreneurs who wish to launch themselves into the world of technology-based careers and has helped develop several innovative products and solutions. Over the past decade KSUM has been able to build a vibrant startup ecosystem allowing technology entrepreneurs to pursue their goals and dreams by providing them complete support in the startup life cycle. Today KSUM along with sector-specific partner organisations, boast of 6200+ registered startups, 10 Lakh+ sq. feet of incubation space, 60+ incubators and 525+ mini incubation centres across the state of Kerala.</p>
        <p>The interventions made by KSUM in Kerala have brought about a cultural change among the youth of Kerala, as well as in how the government goes about its work. Young minds who come up with innovative solutions now have the support of various incubators and government schemes as highlighted earlier, which not only help in bringing funding but also provide mentorship and expansion opportunities at different stages. This approach of the government enables startups to entrepreneurs to get ample opportunities to collaborate with the support infrastructure to develop impactful technology solutions.</p>
      </div>
    ),
  },
  iedc: {
    title: 'About IEDC Kerala',
    logo: '/iedc-logo-color.png',
    shortDescription: 'The Innovation and Entrepreneurship Development Centres (IEDCs), a flagship initiative of Kerala Startup Mission (KSUM), promote innovation and entrepreneurship among students across the state.',
    fullDescription: ( <div className="text-slate-600 leading-relaxed space-y-4">
        <p className="mb-4">The Innovation and Entrepreneurship Development Centres (IEDCs), a flagship initiative of Kerala Startup Mission (KSUM), promote innovation and entrepreneurship among students across the state. Operating in engineering, management, arts & science colleges, medical institutions, polytechnics, and universities, IEDCs provide opportunities to experiment, innovate, and turn ideas into viable products and services.</p>
        <p>With over 550+ centres across Kerala, IEDCs act as mini incubators, offering mentorship, technology, infrastructure, early-stage funding, and global exposure. Programs like LEAP, Startup i3, and the Innovators Premiere League (IPL) guide students from ideation to prototypes, while events like the IEDC Summit and Startup School further strengthen Kerala's entrepreneurial ecosystem.</p>
    </div> ),
  },
  lbscek: {
    title: 'About LBSCEK',
    logo: '/lbscek-logo-black.png',
    shortDescription: 'Established in 1993, Lal Bahadur Shastri College of Engineering (LBSCE), Kasaragod, functions under the L.B.S. Centre for Science and Technology, an autonomous institution owned by the Government of Kerala. A premier government institution driving innovation and inclusion.',
    fullDescription: ( <div className="text-slate-600 leading-relaxed space-y-4">
        <p className="mb-4">Established in 1993, Lal Bahadur Shastri College of Engineering (LBSCE), Kasaragod, functions under the L.B.S. Centre for Science and Technology, Thiruvananthapuram, an autonomous institution owned by the Government of Kerala. The college offers AICTE-approved undergraduate (B.Tech.) programs in eight engineering disciplines, including two new programs introduced this year under the Department of Computer Science and Engineering — Artificial Intelligence and Data Science, and Computer Science and Business Systems, the latter offered in collaboration with Tata Consultancy Services (TCS). Additionally, the college offers one postgraduate (M.Tech.) program under the Department of Computer Science and Engineering.</p>
        <p className="mb-4">All eligible programs are accredited by the National Board of Accreditation (NBA), reflecting the institution's steadfast commitment to academic excellence and quality education. As a Government of Kerala undertaking with a proven record in academics and placements, LBSCE stands as one of the most sought-after engineering institutions in the Malabar region.</p>
        <p className="mb-4">The college is also a vibrant research centre, with many faculty and students pursuing Ph.D. programs across various engineering disciplines, fostering a culture of innovation, inquiry, and knowledge creation.</p>
        <p className="mb-4">The institution hosts the TrEST (Trivandrum Engineering Science and Technology) Satellite Centre under the TrEST Research Park, Government of Kerala, which aims to expand its outreach to academic institutions across the state in fields such as Science, Engineering, Agriculture, and Medicine. This initiative promotes startup incubation near campuses, creating enhanced opportunities for internships, employment, and skill development.</p>
        <p className="mb-4">Further strengthening its innovation ecosystem, LBSCE has been elevated as a Domain Institution under the Kerala Development and Innovation Strategic Council (K-DISC), reinforcing its role in nurturing future-ready engineers, researchers, and entrepreneurs.</p>
        <p className="mb-4">Located in the scenic Muliyar Panchayath of Kasaragod District, the 52-acre campus is situated about 12 km from Kasaragod town, 14 km from the railway station, and 75 km from Mangaluru Airport, ensuring easy accessibility.</p>
        <p className="mb-4">Beyond academics, LBSCE continues to empower students from underserved and rural communities, contributing significantly to inclusive education and regional development.</p>
        <p>As a hub of innovation, research, and entrepreneurship, LBSCE is proud to host the IEDC Summit, bringing together creative minds to shape the future of technology and startups in Kerala.</p>
      </div> ),
  },
  lbsiedc: {
    title: 'About IEDC LBSCEK',
    logo: '/iedc-lbs-logo-color.png',
    shortDescription: 'The IEDC at LBS College of Engineering, Kasaragod, serves as a catalyst for innovation and entrepreneurship within the campus, providing students with mentorship, resources, and funding opportunities.',
    fullDescription: ( <div className="text-slate-600 leading-relaxed space-y-4"> <p>The Innovation and Entrepreneurship Development Centre (IEDC) at LBS College of Engineering, Kasaragod, functions under the aegis of Kerala Startup Mission (KSUM) with the vision to foster innovation, creativity, and entrepreneurial thinking among students. IEDC LBSCEK serves as a launchpad for young innovators by organizing workshops, hackathons, and mentorship programs that transform ideas into viable products and startups. The centre actively collaborates with industries, research institutions, and ecosystem enablers to cultivate a strong culture of innovation and empower students to become technology-driven entrepreneurs. Guided by dedicated mentors and an active founder community, the cell has evolved into a thriving ecosystem that inspires students to ideate, innovate, and lead the change toward a sustainable and technology-driven future.</p></div> ),
  },
};

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
          {/* Style Update: Pill-shaped subheading for a modern look */}
          <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full">
            About the Summit
          </div>
          {/* Style Update: Using slate for richer blacks and tighter line-height */}
          <h2 className="text-slate-900 text-4xl md:text-5xl font-bold font-inter leading-tight">
            A Decade of Innovation
          </h2>
          <div className="w-full max-w-3xl pt-1">
            <p className="text-blue-600 text-lg md:text-xl font-medium font-inter">
              Asia's largest summit for aspiring entrepreneurs
            </p>
            {/* Style Update: Softer gray for body text */}
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mt-3">
              The IEDC Summit 2025 marks the 10th anniversary of Asia's largest summit for aspiring entrepreneurs, celebrating innovation, collaboration, and technological excellence.
            </p>
          </div>
        </div>

        <div ref={contentRef} className="w-full space-y-16">
          {/* Summit Intro Section */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2 lg:w-[560px] order-2 md:order-1">
              <h3 className="text-slate-900 text-3xl md:text-4xl font-bold font-inter">
                {aboutContent.summit.title}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mt-5">
                {aboutContent.summit.shortDescription}
              </p>
              {/* Style Update: Button with icon for better affordance */}
              <button
                onClick={() => openModal('summit')}
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 mt-6 group"
              >
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {/* Style Update: Softer shadow and interactive hover effect */}
            <div className="w-full md:flex-1 h-72 md:h-96 rounded-2xl shadow-lg shadow-blue-500/10 border border-slate-100 overflow-hidden order-1 md:order-2 transition-transform duration-300 hover:scale-105">
              <img src="/iedc-about.webp" alt="IEDC Summit" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cardData.map((card) => (
              // Style Update: Softer border, subtle background, and engaging hover effects (lift & shadow)
              <div key={card.id} className="w-full max-w-xl self-stretch p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 flex flex-col gap-4 relative justify-self-center transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 hover:-translate-y-2">
                {/* Style Update: Logo as a less intrusive watermark */}
                <img src={card.logo} alt={`${card.title} Logo`} className="absolute top-6 right-6 h-16 w-auto object-contain opacity-50" />
                <h4 className="text-slate-900 text-2xl font-bold font-inter leading-tight pr-16">
                  {card.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {card.shortDescription}
                </p>
                <button
                  onClick={() => openModal(card.id)}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 mt-auto pt-2 text-left group"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div 
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
              showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeModal}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)'}} // Replaced backdrop-blur for wider browser support
          >
            <div 
              className={`bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col transform transition-all duration-300 ${
                showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex-shrink-0 bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between z-10 rounded-t-2xl">
                <h3 className="text-2xl font-bold text-slate-900 font-inter">
                  {selectedContent?.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-6 overflow-y-auto">
                {selectedContent?.fullDescription}
              </div>

              {/* Modal Footer */}
              <div className="flex-shrink-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-end rounded-b-2xl">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-base font-inter focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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