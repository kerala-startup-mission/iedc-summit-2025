import React from "react";
import gridImage from "../assets/grid.svg";
import elipseImage from "../assets/Ellipse3.svg";
import elipse4 from "../assets/Ellipse 4.svg";

const About = () => {
  return (
    <section
      id="about"
      className="w-full px-5 md:px-16 lg:px-20 py-16 md:py-24 bg-white md:bg-blue-50/50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 md:mb-5 relative">
          <img
            src={elipseImage}
            alt=""
            className="absolute -left-[9%] -top-[120%]"
          />
          <img
            src={elipse4}
            alt=""
            className="absolute -left-[10%] -top-[120%]"
          />
          <div className="flex flex-col lg:flex-row lg:gap-12 justify-between">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-blue-500 mb-8 md:mb-12">
              About
            </h2>
            {/* Right Side - Description */}
            <div className="lg:w-2/3 ">
              <div className="w-[787px] text-justify justify-center">
                <span className="text-black text-2xl font-light font-['Gilroy'] leading-7">
                  The IEDC Summit 2025, organised by Kerala Startup Mission and
                  hosted by L.B.S. College of Engineering, Kasaragod, marks the
                  10th anniversary edition of this flagship event, celebrating a
                  decade of fostering innovation, entrepreneurship, and
                  technological excellence. This two-day summit invites
                  students, aspiring entrepreneurs, innovators, and faculty to
                  participate in a vibrant festival of ideas, collaboration, and
                  learning.{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Image */}
        <div className="flex flex-row justify-between gap-15">
          <div className="flex flex-col gap-10 mt-38">
            <div className="w-44 justify-center text-black text-3xl font-normal font-['Clash_Display'] leading-7">
              A Decade of Innovation
            </div>
            <div className="w-40 opacity-75 justify-center text-black text-2xl font-light font-['Gilroy'] leading-7">
              Asia's largest summit for aspiring entrepreneurs
            </div>
          </div>
          <div className="w-full flex justify-center z-10">
            <img
              src={gridImage}
              alt="EDC Summit Statistics Grid"
              className="w-full max-w-4xl h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );

export default About;
