import React, { useState, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const About = () => {
  const headerRef = useScrollAnimation({ y: 30, duration: 0.8, delay: 0.2 });
  const contentRef = useScrollAnimation({ y: 40, duration: 0.8, stagger: 0.2, delay: 0.3 });
  
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const openModal = (type) => {
    setModalContent(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Don't reset modalContent immediately to prevent re-render during animation
  };

  const ksumFullContent = (
    <>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify mb-4">
        The Kerala Startup Mission (KSUM) is the nodal agency of the government of Kerala for promoting entrepreneurship in the state. It is also the implementing body for the Kerala Technology Startup Policy that supports the state's startup ecosystem through the various schemes and support programs. KSUM was founded in 2006, with the goal to promote technology-based entrepreneurship activities and to create the infrastructure and ecosystem required to support high-end technology-based startup businesses.
      </p>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify mb-4">
        KSUM acts as a springboard for budding entrepreneurs who wish to launch themselves into the world of technology-based careers and has helped develop several innovative products and solutions. Over the past decade KSUM has been able to build a vibrant startup ecosystem allowing technology entrepreneurs to pursue their goals and dreams by providing them complete support in the startup life cycle. Today KSUM along with sector-specific partner organisations, boast of 6200+ registered startups, 10 Lakh+ sq. feet of incubation space, 60+ incubators and 525+ mini incubation centres across the state of Kerala.
      </p>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify">
        The interventions made by KSUM in Kerala have brought about a cultural change among the youth of Kerala, as well as in how the government goes about its work. Young minds who come up with innovative solutions now have the support of various incubators and government schemes as highlighted earlier, which not only help bring in funding but also provide mentorship and expansion opportunities at different stages. This approach of the government enables startups to entrepreneurs to get ample opportunities to collaborate with the support infrastructure to develop impactful technology solutions.
      </p>
    </>
  );

  const iedcFullContent = (
    <>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify mb-4">
        The Innovation and Entrepreneurship Development Centres (IEDCs), a flagship initiative of Kerala Startup Mission (KSUM), promote innovation and entrepreneurship among students across the state. Operating in engineering, management, arts & science colleges, medical institutions, polytechnics, and universities, IEDCs provide opportunities to experiment, innovate, and turn ideas into viable products and services.
      </p>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify">
        With over 550+ centres across Kerala, IEDCs act as mini incubators, offering mentorship, technology, infrastructure, early-stage funding, and global exposure. Programs like LEAP, Startup i3, and the Innovators' Premiere League (IPL) guide students from ideation to prototypes, while events like the IEDC Summit and Startup School further strengthen Kerala's entrepreneurial ecosystem.
      </p>
    </>
  );

  const lbscekFullContent = (
    <>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify mb-4">
        Established in 1993, Lal Bahadur Shastri College of Engineering (LBSCE), Kasaragod, functions under the L.B.S. Centre for Science and Technology, Thiruvananthapuram, an autonomous institution owned by the Government of Kerala. The college offers AICTE-approved undergraduate (B.Tech.) programs in eight engineering disciplines, including two new programs introduced this year under the Department of Computer Science and Engineering — Artificial Intelligence and Data Science, and Computer Science and Business Systems, the latter offered in collaboration with Tata Consultancy Services (TCS). Additionally, the college offers one postgraduate (M.Tech.) program under the Department of Computer Science and Engineering.
      </p>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify mb-4">
        All eligible programs are accredited by the National Board of Accreditation (NBA), reflecting the institution's steadfast commitment to academic excellence and quality education. As a Government of Kerala undertaking with a proven record in academics and placements, LBSCE stands as one of the most sought-after engineering institutions in the Malabar region.
      </p>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify mb-4">
        The college is also a vibrant research centre, with many faculty and students pursuing Ph.D. programs across various engineering disciplines, fostering a culture of innovation, inquiry, and knowledge creation.
      </p>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify mb-4">
        The institution hosts the TrEST (Trivandrum Engineering Science and Technology) Satellite Centre under the TrEST Research Park, Government of Kerala, which aims to expand its outreach to academic institutions across the state in fields such as Science, Engineering, Agriculture, and Medicine. This initiative promotes startup incubation near campuses, creating enhanced opportunities for internships, employment, and skill development.
      </p>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify mb-4">
        Further strengthening its innovation ecosystem, LBSCE has been elevated as a Domain Institution under the Kerala Development and Innovation Strategic Council (K-DISC), reinforcing its role in nurturing future-ready engineers, researchers, and entrepreneurs.
      </p>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify mb-4">
        Located in the scenic Muliyar Panchayath of Kasaragod District, the 52-acre campus is situated about 12 km from Kasaragod town, 14 km from the railway station, and 75 km from Mangaluru Airport, ensuring easy accessibility.
      </p>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify mb-4">
        Beyond academics, LBSCE continues to empower students from underserved and rural communities, contributing significantly to inclusive education and regional development.
      </p>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify">
        As a hub of innovation, research, and entrepreneurship, LBSCE is proud to host the IEDC Summit, bringing together creative minds to shape the future of technology and startups in Kerala.
      </p>
    </>
  );

  const lbsiedcFullContent = (
    <>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify">
        The Innovation and Entrepreneurship Development Centre (IEDC) at LBS College of Engineering, Kasaragod, functions under the aegis of Kerala Startup Mission (KSUM) with the vision to foster innovation, creativity, and entrepreneurial thinking among students. IEDC LBSCEK serves as a launchpad for young innovators by organizing workshops, hackathons, and mentorship programs that transform ideas into viable products and startups. The centre actively collaborates with industries, research institutions, and ecosystem enablers to cultivate a strong culture of innovation and empower students to become technology-driven entrepreneurs. Guided by dedicated mentors and an active founder community, the cell has evolved into a thriving ecosystem that inspires students to ideate, innovate, and lead the change toward a sustainable and technology-driven future.
      </p>
    </>
  );

  const summitFullContent = (
    <>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify mb-4">
        The IEDC Summit 2025, organised by Kerala Startup Mission and hosted by L.B.S. College of Engineering, Kasaragod, marks the 10th anniversary edition of this flagship event, celebrating a decade of fostering innovation, entrepreneurship, and technological excellence. This one-day summit invites students, aspiring entrepreneurs, innovators, and faculty to participate in a vibrant festival of ideas, collaboration, and learning.
      </p>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify mb-4">
        As one of the region's most anticipated events, the summit provides a dynamic platform for interactive workshops, panel discussions, seminars, and keynote sessions led by industry experts and successful entrepreneurs. Participants will gain valuable insights into emerging trends, develop entrepreneurial skills, and explore opportunities to transform ideas into impactful ventures.
      </p>
      <p className="text-gray-500 text-base font-normal font-inter leading-7 text-justify">
        By bringing together diverse minds under one roof, the IEDC Summit 2025 provides a unique space for networking, knowledge sharing, and skill development. L.B.S. College of Engineering, Kasaragod reaffirms its commitment to empowering the next generation of innovators and advancing the spirit of entrepreneurship, creativity, and technological growth across the region.
      </p>
    </>
  );

  return (
    <section id="about" className="w-full px-5 md:px-16 lg:px-20 py-12 md:py-20 bg-white md:bg-blue-50">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headerRef} className="w-full inline-flex flex-col justify-start items-center gap-3 mb-8 md:mb-16">
          <div className="inline-flex justify-center items-start">
            <div className="text-center justify-center text-blue-600 text-xs font-bold font-inter uppercase leading-tight md:leading-none tracking-widest md:tracking-wider">
              About the Summit
            </div>
          </div>
          <div className="self-stretch pb-[0.67px] flex flex-col justify-start items-center">
            <div className="self-stretch text-center justify-center text-gray-800 text-3xl md:text-5xl font-bold font-inter leading-10 md:leading-[71.68px]">
              A Decade of Innovation
            </div>
          </div>
          <div className="w-full max-w-[800px] pt-1 flex flex-col justify-start items-center gap-2">
            <div className="text-center justify-center text-blue-600 text-lg md:text-xl font-semibold font-inter leading-relaxed">
              Asia's largest summit for aspiring entrepreneurs
            </div>
            <div className="text-center justify-center text-gray-500 text-sm md:text-base font-normal font-inter leading-normal md:leading-7">
              The IEDC Summit 2025 marks the 10th anniversary of Asia's largest summit for aspiring entrepreneurs, celebrating innovation, collaboration, and technological excellence.
            </div>
          </div>
        </div>

        <div ref={contentRef} className="hidden md:block">
          <div className="w-full inline-flex justify-center items-start gap-16 mb-16">
            <div className="w-[560px] pb-6 inline-flex flex-col justify-start items-start gap-6">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch max-h-12 justify-center text-gray-800 text-3xl font-bold font-inter leading-10">
                  About the Summit
                </div>
              </div>
              <div className="self-stretch pb-px flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-500 text-base font-normal font-inter leading-7 text-justify">
                  The IEDC Summit 2025, organised by Kerala Startup Mission and hosted by L.B.S. College of Engineering, Kasaragod, marks the 10th anniversary edition of this flagship event, celebrating a decade of fostering innovation, entrepreneurship, and technological excellence.
                </div>
              </div>
              <button
                onClick={() => openModal('summit')}
                className="text-blue-600 text-sm font-semibold font-inter hover:text-blue-700 transition-colors"
              >
                Read More
              </button>
            </div>

            <div className="flex-1 h-96 rounded-xl shadow-[0px_4px_15px_0px_rgba(37,99,235,0.08)] border-2 border-gray-200 overflow-hidden">
              <img 
                src="/iedc-about.webp" 
                alt="IEDC Summit" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {/* KSUM Card */}
            <div className="w-full max-w-[576px] self-stretch px-8 py-8 bg-white rounded-xl border-2 border-blue-100 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-800 text-xl font-bold font-inter leading-loose">
                  About KSUM
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-500 text-base font-normal font-inter leading-7 text-justify">
                  The Kerala Startup Mission (KSUM) is the nodal agency of the government of Kerala for promoting entrepreneurship in the state. It is also the implementing body for the Kerala Technology Startup Policy.
                </div>
              </div>
              <button
                onClick={() => openModal('ksum')}
                className="text-blue-600 text-sm font-semibold font-inter hover:text-blue-700 transition-colors"
              >
                Read More
              </button>
            </div>

            {/* IEDC Kerala Card */}
            <div className="w-full max-w-[576px] self-stretch px-8 py-8 bg-white rounded-xl border-2 border-blue-100 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-800 text-xl font-bold font-inter leading-loose">
                  About IEDC Kerala
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-500 text-base font-normal font-inter leading-7 text-justify">
                  The Innovation and Entrepreneurship Development Centres (IEDCs), a flagship initiative of Kerala Startup Mission (KSUM), promote innovation and entrepreneurship among students across the state.
                </div>
              </div>
              <button
                onClick={() => openModal('iedc')}
                className="text-blue-600 text-sm font-semibold font-inter hover:text-blue-700 transition-colors"
              >
                Read More
              </button>
            </div>

            {/* LBSCEK Card */}
            <div className="w-full max-w-[576px] self-stretch px-8 py-8 bg-white rounded-xl border-2 border-blue-100 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-800 text-xl font-bold font-inter leading-loose">
                  About LBSCEK
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-500 text-base font-normal font-inter leading-7 text-justify">
                  Established in 1993, Lal Bahadur Shastri College of Engineering (LBSCE), Kasaragod, functions under the L.B.S. Centre for Science and Technology, an autonomous institution owned by the Government of Kerala. A premier government institution driving innovation and inclusion.
                </div>
              </div>
              <button
                onClick={() => openModal('lbscek')}
                className="text-blue-600 text-sm font-semibold font-inter hover:text-blue-700 transition-colors"
              >
                Read More
              </button>
            </div>

            {/* IEDC LBSCEK Card */}
            <div className="w-full max-w-[576px] self-stretch px-8 py-8 bg-white rounded-xl border-2 border-blue-100 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-800 text-xl font-bold font-inter leading-loose">
                  About IEDC LBSCEK
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-500 text-base font-normal font-inter leading-7 text-justify">
                  The IEDC at LBS College of Engineering, Kasaragod, serves as a catalyst for innovation and entrepreneurship within the campus, providing students with mentorship, resources, and funding opportunities.
                </div>
              </div>
              <button
                onClick={() => openModal('lbsiedc')}
                className="text-blue-600 text-sm font-semibold font-inter hover:text-blue-700 transition-colors"
              >
                Read More
              </button>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden self-stretch flex flex-col justify-start items-start gap-4">
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch justify-center text-gray-800 text-xl font-bold font-inter leading-9">
              About the Summit
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-center text-gray-500 text-base font-normal font-inter leading-7 text-justify">
              The IEDC Summit 2025, organised by Kerala Startup Mission and hosted by L.B.S. College of Engineering, Kasaragod, marks the 10th anniversary edition of this flagship event, celebrating a decade of fostering innovation, entrepreneurship, and technological excellence.
            </div>
          </div>
          <button
            onClick={() => openModal('summit')}
            className="text-blue-600 text-sm font-semibold font-inter hover:text-blue-700 transition-colors"
          >
            Read More
          </button>

          <div className="self-stretch h-64 rounded-xl shadow-[0px_4px_15px_0px_rgba(37,99,235,0.08)] border-2 border-gray-200 overflow-hidden mt-4">
            <img 
              src="/iedc-about.webp" 
              alt="IEDC Summit" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden self-stretch flex flex-col justify-start items-start gap-6 mt-8">
          {/* KSUM Card Mobile */}
          <div className="self-stretch p-6 bg-white rounded-xl border-2 border-blue-100 flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-gray-800 text-xl font-bold font-inter leading-7">
                About KSUM
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-gray-500 text-base font-normal font-inter leading-7 text-justify">
                The Kerala Startup Mission (KSUM) is the nodal agency of the government of Kerala for promoting entrepreneurship in the state. It is also the implementing body for the Kerala Technology Startup Policy.
              </div>
            </div>
            <button
              onClick={() => openModal('ksum')}
              className="text-blue-600 text-sm font-semibold font-inter hover:text-blue-700 transition-colors"
            >
              Read More
            </button>
          </div>

          {/* IEDC Kerala Card Mobile */}
          <div className="self-stretch p-6 bg-white rounded-xl border-2 border-blue-100 flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-gray-800 text-xl font-bold font-inter leading-7">
                About IEDC Kerala
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-gray-500 text-base font-normal font-inter leading-7 text-justify">
                The Innovation and Entrepreneurship Development Centres (IEDCs), a flagship initiative of Kerala Startup Mission (KSUM), promote innovation and entrepreneurship among students across the state.
              </div>
            </div>
            <button
              onClick={() => openModal('iedc')}
              className="text-blue-600 text-sm font-semibold font-inter hover:text-blue-700 transition-colors"
            >
              Read More
            </button>
          </div>

          {/* LBSCEK Card Mobile */}
          <div className="self-stretch p-6 bg-white rounded-xl border-2 border-blue-100 flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-gray-800 text-xl font-bold font-inter leading-7">
                About LBSCEK
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-gray-500 text-base font-normal font-inter leading-7 text-justify">
                Established in 1993, Lal Bahadur Shastri College of Engineering (LBSCE), Kasaragod, functions under the L.B.S. Centre for Science and Technology, an autonomous institution owned by the Government of Kerala. A premier government institution driving innovation and inclusion.
              </div>
            </div>
            <button
              onClick={() => openModal('lbscek')}
              className="text-blue-600 text-sm font-semibold font-inter hover:text-blue-700 transition-colors"
            >
              Read More
            </button>
          </div>

          {/* IEDC LBSCEK Card Mobile */}
          <div className="self-stretch p-6 bg-white rounded-xl border-2 border-blue-100 flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-gray-800 text-xl font-bold font-inter leading-7">
                About IEDC LBSCEK
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-gray-500 text-base font-normal font-inter leading-7 text-justify">
                The IEDC at LBS College of Engineering, Kasaragod, serves as a catalyst for innovation and entrepreneurship within the campus, providing students with mentorship, resources, and funding opportunities.
              </div>
            </div>
            <button
              onClick={() => openModal('lbsiedc')}
              className="text-blue-600 text-sm font-semibold font-inter hover:text-blue-700 transition-colors"
            >
              Read More
            </button>
          </div>
        </div>

        {/* Modal */}
        {(showModal || modalContent) && (
          <div 
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
              showModal ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
            }`}
            onClick={closeModal}
          >
            <div 
              className={`bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto transform transition-all duration-300 ${
                showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 md:px-8 py-4 md:py-6 flex items-center justify-between rounded-t-2xl z-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-inter">
                  {modalContent === 'ksum' ? 'About KSUM' : modalContent === 'iedc' ? 'About IEDC Kerala' : modalContent === 'lbscek' ? 'About LBSCEK' : modalContent === 'lbsiedc' ? 'About IEDC LBSCEK' : 'About the Summit'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-6 md:px-8 py-6 md:py-8">
                {modalContent === 'ksum' ? ksumFullContent : modalContent === 'iedc' ? iedcFullContent : modalContent === 'lbscek' ? lbscekFullContent : modalContent === 'lbsiedc' ? lbsiedcFullContent : summitFullContent}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 md:px-8 py-4 flex justify-end rounded-b-2xl">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm font-inter"
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