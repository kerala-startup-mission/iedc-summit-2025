import React from 'react';

const About = () => {
  return (
    <section id="about" className="px-12 py-20 bg-blue-50">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-3 mb-16">
          <span className="text-blue-600 text-xs font-bold font-inter uppercase tracking-widest">
            About the Summit
          </span>
          <h2 className="text-gray-800 text-5xl font-bold font-inter text-center">
            A Decade of Innovation
          </h2>
          <p className="text-gray-500 text-base font-normal font-inter text-center max-w-[700px] leading-7 mt-1">
            The IEDC Summit 2025 marks the 10th anniversary of Kerala's premier entrepreneurship
            <br />
            event, celebrating innovation, collaboration, and technological excellence.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="flex gap-16 mb-16">
          {/* Left Column - Text Content */}
          <div className="w-[560px] flex flex-col gap-6">
            <h3 className="text-gray-800 text-3xl font-bold font-inter">
              Empowering Tomorrow's Innovators
            </h3>
            
            <p className="text-gray-500 text-base font-normal font-inter leading-7">
              Welcome to IEDC Summit 2025, the premier platform celebrating innovation,
              entrepreneurship, and technology. Hosted by LBS College of Engineering,
              Kasaragod, this November, the summit unites aspiring entrepreneurs,
              innovators, and visionaries for interactive workshops, inspiring sessions, and
              hands-on experiences.
            </p>
            
            <p className="text-gray-500 text-base font-normal font-inter leading-7">
              The IEDC Summit 2025 provides a dynamic platform for interactive workshops,
              panel discussions, seminars, and keynote sessions led by industry experts and
              successful entrepreneurs. Participants will gain valuable insights into emerging
              trends, develop entrepreneurial skills, and explore opportunities to transform
              ideas into impactful ventures.
            </p>
            
            <p className="text-gray-500 text-sm font-normal font-inter leading-7">
              By bringing together diverse minds under one roof, the summit provides a
              unique space for networking, knowledge sharing, and skill development,
              reaffirming our commitment to empowering the next generation of innovators.
            </p>
          </div>

          {/* Right Column - Image Placeholder */}
          <div className="flex-1 h-96 bg-white rounded-xl shadow-[0px_4px_15px_0px_rgba(37,99,235,0.08)] border-2 border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <h4 className="text-gray-800 text-2xl font-bold font-inter mb-2">
                Summit Event Photo
              </h4>
              <p className="text-gray-500 text-base font-normal font-inter">
                Image Placeholder
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="flex gap-8">
          <div className="w-[576px] px-8 py-8 bg-white rounded-xl border-2 border-blue-100 flex flex-col gap-4">
            <h4 className="text-gray-800 text-lg font-bold font-inter">
              LBS College of Engineering
            </h4>
            <p className="text-gray-500 text-sm font-normal font-inter leading-relaxed">
              Established in 1993, LBSCE operates under the Government of Kerala,
              offering AICTE-approved B.Tech programs across eight engineering
              disciplines. All departments are NBA-accredited, ensuring academic
              excellence.
            </p>
          </div>

          <div className="w-[576px] px-8 py-8 bg-white rounded-xl border-2 border-blue-100 flex flex-col gap-4">
            <h4 className="text-gray-800 text-xl font-bold font-inter">
              IEDC Kerala
            </h4>
            <p className="text-gray-500 text-sm font-normal font-inter leading-relaxed">
              A flagship initiative of Kerala Startup Mission with 450+ centres, IEDCs
              promote innovation and entrepreneurship, offering mentorship,
              infrastructure, and funding to transform student ideas into viable ventures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
