import React from "react";

const Schedule = () => {
  return (
    <section
      id="Schedule"
      className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-white relative py-20"
    >
        <div className="w-full md:text-center z-10">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-clash-display md:font-black text-blue-500 relative z-20 text-center">
            Schedule
          </h2>
          <div className="w-full px-6 text-center mt-4">
            <h3 className="text-2xl md:text-4xl font-light font-gilroy-light">
              Coming Soon
            </h3>
            <p className="mt-4 text-gray-500 font-gilroy-light">
                Stay tuned for the detailed event schedule.
            </p>
          </div>
        </div>

      {/* Colored Blocks at Bottom */}
      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 absolute bottom-0 left-0 object-cover"
      />
    </section>
  );
};

export default Schedule;
