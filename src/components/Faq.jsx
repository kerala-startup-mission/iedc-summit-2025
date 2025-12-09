import React, { useState } from "react";
import LogoLoop from "./LogoLoop";

const FaqItem = ({ id, question, answer, isOpen, toggle }) => {
  return (
    <div className="tab border-2 rounded-xl bg-white overflow-hidden">
      <div
        className="tab__label block cursor-pointer p-4 font-medium text-lg md:text-xl border-l-4 border-blue-500 transition-all duration-300"
        onClick={() => toggle(id)}
      >
        {question}
      </div>
      <div
        className={`tab__content overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="p-3 border-t-2">{answer}</div>
      </div>
    </div>
  );
};

const Faq = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <section className="py-2 px-5 bg-white">
        <div className="container mx-auto">
          <div className=" text-3xl md:text-5xl lg:text-5xl font-gilroy text-center mb-10 lg:mb-20 text-blue-600">
            FAQ
          </div>
          <div className="grid md:grid-cols-2 gap-5 lg:gap-10 mb-20">
          <div className="font-clash-display">
            <div className="accordion accordion--radio flex flex-col gap-3">
              <FaqItem
                id="rd1"
                question="What is IEDC?"
                answer="A platform in educational institutions to foster innovation and entrepreneurial skills in students."
                isOpen={openId === "rd1"}
                toggle={toggleFaq}
              />
              <FaqItem
                id="rd2"
                question="What is the IEDC Summit?"
                answer="IEDC Summit 2025 is Kerala's largest innovation and entrepreneurship gathering, where students get the opportunity to interact with founders, entrepreneurs, and industry professionals. The summit encourages participants to think creatively and take their first steps toward entrepreneurship and startup building. As part of the event, several flagship programs and competitions are conducted, giving aspiring entrepreneurs a platform."
                isOpen={openId === "rd2"}
                toggle={toggleFaq}
              />
              <FaqItem
                id="rd3"
                question="What includes in it?"
                answer="Keynote Talks: Inspiring stories from top entrepreneurs. Panel Discussions: Experts share insights on startups and innovation. Learning Stations: Student projects and tech showcases with KSUM mentors. Workshops: Hands-on sessions on design thinking and entrepreneurship. Networking: Meet and connect with students, founders, and investors."
                isOpen={openId === "rd3"}
                toggle={toggleFaq}
              />
              <FaqItem
                id="rd4"
                question="Who can participate?"
                answer="The IEDC Summit 2025 is open to all students and aspiring innovators who are passionate about entrepreneurship, creativity, and innovation. Whether you're an active startup enthusiast or simply curious to learn and experience something new, the summit welcomes everyone who wants to explore the world of ideas and innovation."
                isOpen={openId === "rd4"}
                toggle={toggleFaq}
              />
              <FaqItem
                id="rd5"
                question="How to Register for the IEDC Summit 2025?"
                answer="Visit the official IEDC Summit 2025 registration page at iedcsummit.in. Click on 'Register Now' on the homepage to begin the registration process. If you have a coupon code, enter it in the designated field during checkout to avail any discounts. Add the registration to your cart, fill in your personal and payment details, choose your preferred payment method, and complete the transaction."
                isOpen={openId === "rd5"}
                toggle={toggleFaq}
              />
              <FaqItem
                id="rd6"
                question="Can I showcase my startup or project at the IEDC Summit?"
                answer="Yes! The IEDC Summit provides a platform for aspiring entrepreneurs and innovators to showcase their startups, projects, or innovative ideas. Participants can interact with industry experts, investors, and fellow entrepreneurs, receive feedback, and gain exposure for their initiatives. You may need to register your project in advance or follow the specific guidelines provided on the official registration page."
                isOpen={openId === "rd6"}
                toggle={toggleFaq}
              />
              <FaqItem
                id="rd107"
                question="What is the benefit of attending?"
                answer="Exposure to the startup/innovation ecosystem and peer learning. A platform to showcase their work. Networking with entrepreneurs/faculty/mentors. Workshops to build relevant entrepreneurial skills."
                isOpen={openId === "rd107"}
                toggle={toggleFaq}
              />
            </div>
          </div>
          <div className="font-clash-display">
            <div className="accordion accordion--radio flex flex-col gap-3">
              <FaqItem
                id="rd7"
                question="Are refreshments or meals provided at the IEDC Summit?"
                answer="Yes! The registration fee includes a registration kit, morning refreshments, and lunch for all participants."
                isOpen={openId === "rd7"}
                toggle={toggleFaq}
              />
              <FaqItem
                id="rd8"
                question="Can we meet founders and entrepreneurs at the Summit?"
                answer="Absolutely! The summit is designed to provide participants with direct interaction opportunities with successful founders, entrepreneurs, and industry professionals. You can attend panel discussions, workshops, and networking sessions to gain insights, ask questions, and explore potential collaborations."
                isOpen={openId === "rd8"}
                toggle={toggleFaq}
              />
              <FaqItem
                id="rd9"
                question="How to do bulk registration for the IEDC Summit 2025?"
                answer={
                  <>
                    To book bulk tickets through the IEDC Summit website, please refer to the <a href="https://drive.google.com/file/d/1tbxi3lB77vrTNivxiruZbignkZbzQGoG/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100 underline">attached PDF</a>. It will guide you through the booking process step-by-step.
                  </>
                }
                isOpen={openId === "rd9"}
                toggle={toggleFaq}
              />
              <FaqItem
                id="rd10"
                question="Are the workshops at the IEDC Summit suitable for beginners, or do I need prior experience?"
                answer="The workshops are designed to cater to participants of all skill levels, including beginners. You don't need prior experience to attend. The sessions will provide step-by-step guidance, practical examples, and mentorship to help everyone learn and participate effectively."
                isOpen={openId === "rd10"}
                toggle={toggleFaq}
              />
              <FaqItem
                id="rd11"
                question="How can I stay updated?"
                answer={
                  <>
                    Follow us on <a href="http://instagram.com/iedcsummit" target="_blank" rel="noopener noreferrer" className="text-blue-400">Instagram</a>, <a href="http://linkedin.com/company/iedcsummit" target="_blank" rel="noopener noreferrer" className="text-blue-400">LinkedIn</a> and regularly check <a href="http://iedcsummit.in" target="_blank" rel="noopener noreferrer" className="text-blue-400">www.iedcsummit.in</a> for updates
                  </>
                }
                isOpen={openId === "rd11"}
                toggle={toggleFaq}
              />
              <FaqItem
                id="rd12"
                question="Whom can I contact for more details about the IEDC Summit?"
                answer={
                  <>
                    For any queries regarding the summit, you can contact the organizing team via the details in the website footer: <br />Email: <a href="mailto:iedcsummit@lbscek.ac.in" className="text-blue-500">iedcsummit@lbscek.ac.in</a><br />Phone: <a href="https://wa.me/918891549779" target="_blank" rel="noopener noreferrer" className="text-blue-500">+91 88915 49779</a>
                  </>
                }
                isOpen={openId === "rd12"}
                toggle={toggleFaq}
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Colored Blocks at Bottom */}
    <img
      src="/hero-blocks.png"
      alt="Decorative blocks"
      className="w-full h-20 sm:h-24 object-cover"
    />

    {/* Scrolling Text Loop */}
    <div className="w-full -mt-7 mb-10 -skew-y-2">
      <LogoLoop
        logos={[
          { text: "IEDC SUMMIT 2025" },
          { text: "IEDC SUMMIT 2025" },
          { text: "IEDC SUMMIT 2025" },
          { text: "IEDC SUMMIT 2025" },
          { text: "IEDC SUMMIT 2025" },
          { text: "IEDC SUMMIT 2025" },
          { text: "IEDC SUMMIT 2025" },
          { text: "IEDC SUMMIT 2025" },
        ]}
        speed={80}
        direction="left"
        logoHeight={20}
        gap={40}
        pauseOnHover={true}
        className="font-gilroy-bold bg-blue-600 py-5  text-white"
        ariaLabel="IEDC Summit 2025"
      />
    </div>
    </>
  );
};

export default Faq;
