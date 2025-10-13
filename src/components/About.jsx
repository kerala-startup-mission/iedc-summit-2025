import React from 'react';

const About = () => {
  return (
    <section id="about" className="w-full px-5 md:px-12 py-12 md:py-20 bg-white md:bg-blue-50">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="w-full inline-flex flex-col justify-start items-center gap-3 mb-8 md:mb-16">
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
          <div className="w-full max-w-[700px] pt-1 flex flex-col justify-start items-center">
            <div className="text-center justify-center text-gray-500 text-sm md:text-base font-normal font-inter leading-normal md:leading-7">
              The IEDC Summit 2025 marks the 10th anniversary of Kerala's premier entrepreneurship
              event, celebrating innovation, collaboration, and technological excellence.
            </div>
          </div>
        </div>

        {/* Main Content - Desktop Layout */}
        <div className="hidden md:block">
          <div className="w-full inline-flex justify-center items-start gap-16 mb-16">
            {/* Left Column - Text Content */}
            <div className="w-[560px] pb-6 inline-flex flex-col justify-start items-start gap-6">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch max-h-12 justify-center text-gray-800 text-3xl font-bold font-inter leading-10">
                  Empowering Tomorrow's Innovators
                </div>
              </div>
              <div className="self-stretch pb-px flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-500 text-base font-normal font-inter leading-7">
                  Welcome to IEDC Summit 2025, the premier platform celebrating innovation,
                  entrepreneurship, and technology. Hosted by LBS College of Engineering,
                  Kasaragod, this November, the summit unites aspiring entrepreneurs,
                  innovators, and visionaries for interactive workshops, inspiring sessions, and
                  hands-on experiences.
                </div>
              </div>
              <div className="self-stretch pb-px flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-500 text-base font-normal font-inter leading-7">
                  The IEDC Summit 2025 provides a dynamic platform for interactive workshops,
                  panel discussions, seminars, and keynote sessions led by industry experts and
                  successful entrepreneurs. Participants will gain valuable insights into emerging
                  trends, develop entrepreneurial skills, and explore opportunities to transform
                  ideas into impactful ventures.
                </div>
              </div>
              <div className="self-stretch pb-[0.60px] flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-500 text-sm font-normal font-inter leading-7">
                  By bringing together diverse minds under one roof, the summit provides a
                  unique space for networking, knowledge sharing, and skill development,
                  reaffirming our commitment to empowering the next generation of innovators.
                </div>
              </div>
            </div>

            {/* Right Column - Image Placeholder */}
            <div className="flex-1 h-96 px-0.5 py-48 bg-white rounded-xl shadow-[0px_4px_15px_0px_rgba(37,99,235,0.08)] border-2 border-gray-200 flex justify-center items-center">
              <div className="inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="justify-center text-gray-800 text-2xl font-bold font-inter leading-10">
                    Summit Event Photo
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="justify-center text-gray-500 text-base font-normal font-inter leading-relaxed">
                    Image Placeholder
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Cards - Desktop */}
          <div className="w-full inline-flex justify-center items-start gap-8">
            <div className="w-[576px] self-stretch px-8 py-8 bg-white rounded-xl border-2 border-blue-100 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch pb-[0.72px] flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-800 text-lg font-bold font-inter leading-loose">
                  LBS College of Engineering
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-500 text-sm font-normal font-inter leading-relaxed">
                  Established in 1993, LBSCE operates under the Government of Kerala,
                  offering AICTE-approved B.Tech programs across eight engineering
                  disciplines. All departments are NBA-accredited, ensuring academic
                  excellence.
                </div>
              </div>
            </div>

            <div className="w-[576px] self-stretch px-8 pt-8 pb-14 bg-white rounded-xl border-2 border-blue-100 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch pb-[0.72px] flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-800 text-xl font-bold font-inter leading-loose">
                  IEDC Kerala
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch justify-center text-gray-500 text-sm font-normal font-inter leading-relaxed">
                  A flagship initiative of Kerala Startup Mission with 450+ IEDCs
                  promote innovation and entrepreneurship, offering mentorship,
                  infrastructure, and funding to transform student ideas into viable ventures.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Mobile Layout */}
        <div className="md:hidden self-stretch flex flex-col justify-start items-start gap-4">
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch justify-center text-gray-800 text-xl font-bold font-inter leading-9">
              Empowering Tomorrow's Innovators
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch justify-center text-gray-500 text-sm font-normal font-inter leading-normal">
              Welcome to IEDC Summit 2025, the premier platform celebrating innovation, entrepreneurship, and technology.
              Hosted by LBS College of Engineering, Kasaragod, this November, the summit unites aspiring entrepreneurs,
              innovators, and visionaries for interactive workshops, inspiring sessions, and hands-on experiences.
            </div>
          </div>

          {/* Mobile Image Placeholder */}
          <div className="self-stretch h-64 px-0.5 pt-24 pb-20 bg-white rounded-xl shadow-[0px_4px_15px_0px_rgba(37,99,235,0.08)] border-2 border-gray-200 inline-flex justify-center items-center">
            <div className="pb-5 inline-flex flex-col justify-start items-start gap-2">
              <div className="self-stretch pb-[0.72px] flex flex-col justify-start items-start">
                <div className="justify-center text-gray-800 text-lg font-bold font-inter leading-loose">
                  Summit Event Photo
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-center text-gray-500 text-sm font-normal font-inter leading-normal">
                  Image Placeholder
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch pt-4 flex flex-col justify-start items-start">
            <div className="self-stretch justify-center text-gray-500 text-sm font-normal font-inter leading-normal">
              The IEDC Summit 2025 provides a dynamic platform for interactive workshops,
              panel discussions, seminars, and keynote sessions led by industry experts and successful
              entrepreneurs. Participants will gain valuable insights into emerging trends, develop entrepreneurial skills, and explore
              opportunities to transform ideas into impactful ventures.
            </div>
          </div>
          <div className="self-stretch pt-[3.18px] flex flex-col justify-start items-start">
            <div className="self-stretch justify-center text-gray-500 text-sm font-normal font-inter leading-normal">
              By bringing together diverse minds under one roof, the summit provides a
              unique space for networking, knowledge sharing, and skill development, reaffirming our commitment
              to empowering the next generation of innovators.
            </div>
          </div>
        </div>

        {/* Bottom Cards - Mobile */}
        <div className="md:hidden self-stretch flex flex-col justify-start items-start gap-6 mt-8">
          <div className="self-stretch p-6 bg-blue-50 rounded-xl border-2 border-blue-100 flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-gray-800 text-lg font-bold font-inter leading-7">
                LBS College of Engineering
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-gray-500 text-sm font-normal font-inter leading-snug">
                Established in 1993, LBSCE operates under the Government of Kerala, offering AICTE-approved B.Tech
                programs across eight engineering disciplines. All departments are NBA-accredited, ensuring academic
                excellence.
              </div>
            </div>
          </div>

          <div className="self-stretch p-6 bg-blue-50 rounded-xl border-2 border-blue-100 flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-gray-800 text-lg font-bold font-inter leading-7">
                IEDC Kerala
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-gray-500 text-sm font-normal font-inter leading-snug">
                A flagship initiative of Kerala Startup Mission with 450+ centres, IEDCs promote innovation and
                entrepreneurship, offering mentorship, infrastructure, and funding to transform student ideas into viable ventures.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
