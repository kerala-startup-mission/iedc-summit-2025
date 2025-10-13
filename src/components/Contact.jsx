import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
  return (
    <section id="contact" className="px-12 py-20 bg-indigo-50">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-3 mb-14">
          <span className="text-blue-600 text-xs font-bold font-inter uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-gray-800 text-5xl font-bold font-inter text-center">
            Let's Connect!
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-10 max-w-[650px] mx-auto">
          <p className="text-gray-500 text-base font-normal font-inter text-center leading-loose">
            Your questions and ideas fuel our mission. Whether you have a query or a spark of
            <br />
            inspiration to share, our team is excited and ready to help. We're just a message
            <br />
            away!
          </p>

          <a 
            href="mailto:iedcsummit@lbscek.ac.in"
            className="px-10 py-4 bg-blue-600 rounded-lg shadow-[0px_4px_15px_0px_rgba(37,99,235,0.30)] text-white text-base font-bold font-inter hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>

          {/* Social Icons 
          <div className="flex justify-center gap-6">
            <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-blue-600 transition-colors cursor-pointer">
              <FaFacebook className="text-blue-600 text-xl" />
            </div>
            <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-blue-600 transition-colors cursor-pointer">
              <FaInstagram className="text-blue-600 text-xl" />
            </div>
            <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-blue-600 transition-colors cursor-pointer">
              <FaLinkedin className="text-blue-600 text-xl" />
            </div>
            <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-blue-600 transition-colors cursor-pointer">
              <FaXTwitter className="text-blue-600 text-xl" />
            </div>
          </div>*/}
        </div>
      </div>
    </section>
  );
};

export default Contact;
