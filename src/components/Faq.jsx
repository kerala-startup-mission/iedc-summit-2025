import React from "react";
import LogoLoop from "./LogoLoop";

const Faq = () => {
  return (
    <>
      <section className="py-12 px-5 bg-white">
        <div className="container mx-auto">
          <div className=" text-3xl md:text-5xl lg:text-5xl font-gilroy text-center mb-10 lg:mb-20 text-blue-600">
            FAQ
          </div>
          <div className="grid md:grid-cols-2 gap-5 lg:gap-10 mb-20">
          <div>
            <div className="accordion accordion--radio flex flex-col gap-3">
              <div className="tab border-2 rounded-xl bg-white overflow-hidden">
                <input type="checkbox" id="rd1" className="hidden peer" />
                <label
                  htmlFor="rd1"
                  className="tab__label block cursor-pointer p-4 font-semibold text-lg md:text-xl border-l-4 border-blue-500 transition-all duration-300"
                >
                  What is IEDC?
                </label>
                <div className="tab__content max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-[1000px]">
                  <div className="p-3 border-t-2">
                    A platform in educational institutions to foster innovation and entrepreneurial skills in students.
                  </div>
                </div>
              </div>
              <div className="tab border-2 rounded-xl bg-white overflow-hidden">
                <input type="checkbox" id="rd2" className="hidden peer" />
                <label
                  htmlFor="rd2"
                  className="tab__label block cursor-pointer p-4 font-semibold text-lg md:text-xl border-l-4 border-blue-500 transition-all duration-300"
                >
                  What is the IEDC Summit?
                </label>
                <div className="tab__content max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-[1000px]">
                  <div className="p-3 border-t-2">
                    IEDC Summit 2025 is Kerala's largest innovation and entrepreneurship gathering, where students get the opportunity to interact with founders, entrepreneurs, and industry professionals. The summit encourages participants to think creatively and take their first steps toward entrepreneurship and startup building. As part of the event, several flagship programs and competitions are conducted, giving aspiring entrepreneurs a platform.
                  </div>
                </div>
              </div>
              <div className="tab border-2 rounded-xl bg-white overflow-hidden">
                <input type="checkbox" id="rd3" className="hidden peer" />
                <label
                  htmlFor="rd3"
                  className="tab__label block cursor-pointer p-4 font-semibold text-lg md:text-xl border-l-4 border-blue-500 transition-all duration-300"
                >
                  What includes in it?
                </label>
                <div className="tab__content max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-[1000px]">
                  <div className="p-3 border-t-2">
                    Keynote Talks: Inspiring stories from top entrepreneurs. Panel Discussions: Experts share insights on startups and innovation. Learning Stations: Student projects and tech showcases with KSUM mentors. Workshops: Hands-on sessions on design thinking and entrepreneurship. Networking: Meet and connect with students, founders, and investors.
                  </div>
                </div>
              </div>
              <div className="tab border-2 rounded-xl bg-white overflow-hidden">
                <input type="checkbox" id="rd4" className="hidden peer" />
                <label
                  htmlFor="rd4"
                  className="tab__label block cursor-pointer p-4 font-semibold text-lg md:text-xl  border-l-4 border-blue-500 transition-all duration-300"
                >
                  Who can participate?
                </label>
                <div className="tab__content max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-[1000px]">
                  <div className="p-3 border-t-2">
                    The IEDC Summit 2025 is open to all students and aspiring innovators who are passionate about entrepreneurship, creativity, and innovation. Whether you're an active startup enthusiast or simply curious to learn and experience something new, the summit welcomes everyone who wants to explore the world of ideas and innovation.
                  </div>
                </div>
              </div>
              <div className="tab border-2 rounded-xl bg-white overflow-hidden">
                <input type="checkbox" id="rd5" className="hidden peer" />
                <label
                  htmlFor="rd5"
                  className="tab__label block cursor-pointer p-4 font-semibold text-lg md:text-xl  border-l-4 border-blue-500 transition-all duration-300"
                >
                  How to Register for the IEDC Summit 2025?
                </label>
                <div className="tab__content max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-[1000px]">
                  <div className="p-3 border-t-2">
                    Visit the official IEDC Summit 2025 registration page at iedcsummit.in. Click on 'Register Now' on the homepage to begin the registration process. If you have a coupon code, enter it in the designated field during checkout to avail any discounts. Add the registration to your cart, fill in your personal and payment details, choose your preferred payment method, and complete the transaction.
                  </div>
                </div>
              </div>
              <div className="tab border-2 rounded-xl bg-white overflow-hidden">
                <input type="checkbox" id="rd6" className="hidden peer" />
                <label
                  htmlFor="rd6"
                  className="tab__label block cursor-pointer p-4 font-semibold text-lg md:text-xl border-l-4 border-blue-500 transition-all duration-300"
                >
                  Can I showcase my startup or project at the IEDC Summit?
                </label>
                <div className="tab__content max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-[1000px]">
                  <div className="p-3 border-t-2">
                    Yes! The IEDC Summit provides a platform for aspiring entrepreneurs and innovators to showcase their startups, projects, or innovative ideas. Participants can interact with industry experts, investors, and fellow entrepreneurs, receive feedback, and gain exposure for their initiatives. You may need to register your project in advance or follow the specific guidelines provided on the official registration page.
                  </div>
                </div>
              </div>
              <div className="tab border-2 rounded-xl bg-white overflow-hidden">
                <input type="checkbox" id="rd107" className="hidden peer" />
                <label
                  htmlFor="rd107"
                  className="tab__label block cursor-pointer p-4 font-semibold text-lg md:text-xl border-l-4 border-blue-500 transition-all duration-300"
                >
                  What is the benefit of attending?
                </label>
                <div className="tab__content max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-[1000px]">
                  <div className="p-3 border-t-2">
                    Exposure to the startup/innovation ecosystem and peer learning. A platform to showcase their work. Networking with entrepreneurs/faculty/mentors. Workshops to build relevant entrepreneurial skills.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="accordion accordion--radio flex flex-col gap-3">
              <div className="tab border-2 rounded-xl bg-white overflow-hidden">
                <input type="checkbox" id="rd7" className="hidden peer" />
                <label
                  htmlFor="rd7"
                  className="tab__label block cursor-pointer p-4 font-semibold text-lg md:text-xl border-l-4 border-blue-500 transition-all duration-300"
                >
                  Are refreshments or meals provided at the IEDC Summit?
                </label>
                <div className="tab__content max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-[1000px]">
                  <div className="p-3 border-t-2">
                    Yes! The registration fee includes a registration kit, morning refreshments, and lunch for all participants.
                  </div>
                </div>
              </div>
              <div className="tab border-2 rounded-xl bg-white overflow-hidden">
                <input type="checkbox" id="rd8" className="hidden peer" />
                <label
                  htmlFor="rd8"
                  className="tab__label block cursor-pointer p-4 font-semibold text-lg md:text-xl border-l-4 border-blue-500 transition-all duration-300"
                >
                  Can we meet founders and entrepreneurs at the Summit?
                </label>
                <div className="tab__content max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-[1000px]">
                  <div className="p-3 border-t-2">
                    Absolutely! The summit is designed to provide participants with direct interaction opportunities with successful founders, entrepreneurs, and industry professionals. You can attend panel discussions, workshops, and networking sessions to gain insights, ask questions, and explore potential collaborations.
                  </div>
                </div>
              </div>
              <div className="tab border-2 rounded-xl bg-white overflow-hidden">
                <input type="checkbox" id="rd9" className="hidden peer" />
                <label
                  htmlFor="rd9"
                  className="tab__label block cursor-pointer p-4 font-semibold text-lg md:text-xl border-l-4 border-blue-500 transition-all duration-300"
                >
                  How to do bulk registration for the IEDC Summit 2025?
                </label>
                <div className="tab__content max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-[1000px]">
                  <div className="p-3 border-t-2">
                    To book bulk tickets through the IEDC Summit website, please refer to the <a href="https://drive.google.com/file/d/1tbxi3lB77vrTNivxiruZbignkZbzQGoG/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100 underline">attached PDF</a>. It will guide you through the booking process step-by-step.
                  </div>
                </div>
              </div>
              <div className="tab border-2 rounded-xl bg-white overflow-hidden">
                <input type="checkbox" id="rd10" className="hidden peer" />
                <label
                  htmlFor="rd10"
                  className="tab__label block cursor-pointer p-4 font-semibold text-lg md:text-xl border-l-4 border-blue-500 transition-all duration-300"
                >
                  Are the workshops at the IEDC Summit suitable for beginners, or do I need prior experience?
                </label>
                <div className="tab__content max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-[1000px]">
                  <div className="p-3 border-t-2">
                    The workshops are designed to cater to participants of all skill levels, including beginners. You don't need prior experience to attend. The sessions will provide step-by-step guidance, practical examples, and mentorship to help everyone learn and participate effectively.
                  </div>
                </div>
              </div>
              <div className="tab border-2 rounded-xl bg-white overflow-hidden">
                <input type="checkbox" id="rd11" className="hidden peer" />
                <label
                  htmlFor="rd11"
                  className="tab__label block cursor-pointer p-4 font-semibold text-lg md:text-xl border-l-4 border-blue-500 transition-all duration-300"
                >
                  How can I stay updated?
                </label>
                <div className="tab__content max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-[1000px]">
                  <div className="p-3 border-t-2">
                    Follow us on Instagram, LinkedIn and regularly check www.innovationfestival.in for updates
                  </div>
                </div>
              </div>
              <div className="tab border-2 rounded-xl bg-white overflow-hidden">
                <input type="checkbox" id="rd12" className="hidden peer" />
                <label
                  htmlFor="rd12"
                  className="tab__label block cursor-pointer p-4 font-semibold text-lg md:text-xl border-l-4 border-blue-500 transition-all duration-300"
                >
                  Whom can I contact for more details about the IEDC Summit?
                </label>
                <div className="tab__content max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-[1000px]">
                  <div className="p-3 border-t-2">
                    For any queries regarding the summit, you can contact the organizing team via the details in the website footer: Email: iedcsummit@lbscek.ac.in, Phone: +91 99467 60222.
                  </div>
                </div>
              </div>
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
