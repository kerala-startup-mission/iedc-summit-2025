import React, { useEffect, useState } from "react";
import LogoLoop from "./LogoLoop";
import { useScrollFadeInUp } from "../hooks/useScrollFadeInUp";

const Partners = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFadeInUp();
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("https://events.startupmission.in/api/event/iedc-summit-2025/speakers");
        const data = await response.json();
        
        if (data.Partners) {
          // Group partners by designation
          const groupedPartners = data.Partners.reduce((acc, partner) => {
            const category = partner.designation || "Other Partners";
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push({
              src: partner.photo,
              alt: partner.name,
              // You can map other fields if needed, e.g. href if available in API
            });
            return acc;
          }, {});

          // Convert to array format expected by the component
          const categoriesArray = Object.keys(groupedPartners).map(title => ({
            title,
            partners: groupedPartners[title]
          }));

          setMainCategories(categoriesArray);
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchPartners();
  }, []);

  // Helper component for the Partner Card
  const PartnerCard = ({ src, alt, label, categoryTitle, href, className = "" }) => {
    
    // Common inner content
    const CardContent = (
      <>
        {/* 1. Category Title (Absolute positioning to keep it at the top) */}
        {categoryTitle && (
          <div className="absolute -top-1 left-0 w-full text-center px-1 z-10">
            <h3 className="font-clash-display text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-wider leading-tight whitespace-nowrap">
              {categoryTitle}
            </h3>
            {/* Small separator line */}
            <div className="w-6 h-[1.5px] bg-blue-100 mx-auto mt-0.5"></div>
          </div>
        )}

        {/* 2. The Icon/Logo */}
        <img
          src={src}
          alt={alt}
          className={`w-full h-28 object-contain -mt-2 ${className}`}
        />

        {/* 3. Sub-label */}
        {label && (
          <p className="md:text-[9px] text-[8px] font-semibold text-gray-400 text-center mt-1 uppercase tracking-wide absolute bottom-2 w-full px-1 leading-tight">
            {label}
          </p>
        )}
      </>
    );

    // Common container classes
    // Using fixed widths (w-32 md:w-40) ensures they look like a grid even when using flex
    const containerClasses =
      "flex flex-col items-center justify-center px-2 py-3 hover:bg-gray-50 transition-all duration-300 rounded-lg h-full min-h-[140px] w-32 md:w-40 relative group border border-transparent hover:border-gray-100 bg-white";

    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${containerClasses} cursor-pointer`}
        >
          {CardContent}
        </a>
      );
    }

    return <div className={containerClasses}>{CardContent}</div>;
  };

  // Helper to flatten categories into grid items with title on the first item
  const flattenData = (categories) => {
    return categories.flatMap((category) => {
      if (category.partners.length === 0) return [];
      const firstPartner = {
        ...category.partners[0],
        categoryTitle: category.title,
      };
      const restPartners = category.partners.slice(1);
      return [firstPartner, ...restPartners];
    });
  };

  // 2. Special Bottom Categories (Powered & Hosted)
  const bottomCategories = [
    {
      title: "Powered By",
      partners: [
        {
          src: "/ksum-logo-black.png",
          alt: "Kerala Startup Mission",
          href: "https://www.startupmission.kerala.gov.in",
          label: "Kerala Startup Mission",
        },
        {
          src: "/iedc-logo-color.png",
          alt: "IEDC Kerala",
          href: "https://iedc.startupmission.in/",
          label: "IEDC Kerala",
        },
      ],
    },
    {
      title: "Hosted By",
      partners: [
        {
          src: "/lbscek-logo-black.png",
          alt: "LBS College of Engineering",
          href: "https://www.lbscek.ac.in",
          label: "LBS College of Engineering",
        },
        {
          src: "/cuk-logo.png",
          alt: "Central University of Kerala",
          href: "https://www.cukerala.ac.in",
          label: "Central University of Kerala",
        },
      ],
    },
  ];

  const mainGridItems = flattenData(mainCategories);
  const bottomGridItems = flattenData(bottomCategories);

  return (
    <section
      id="partners"
      className={`w-full bg-white overflow-hidden relative ${
        sectionVisible ? "fade-in-up-visible" : "fade-in-up-hidden"
      }`}
      ref={sectionRef}
    >
      {/* Main Content Container */}
      <div className="container mx-auto px-5 pt-24 pb-16">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-blue-500 font-clash-display mb-4">
            Our Partners
          </h2>
          <p className="text-xs md:text-base lg:text-lg text-black font-light font-gilroy-light max-w-2xl mx-auto">
            Grateful to our partners who make IEDC Summit 2025 possible through
            their unwavering support.
          </p>
        </div>

        {/* Main Grid (Using Flexbox to grow from center) */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
            {mainGridItems.map((item, index) => (
              <PartnerCard
                key={`main-${index}`}
                src={item.src}
                alt={item.alt}
                label={item.label}
                href={item.href}
                categoryTitle={item.categoryTitle}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section (Powered & Hosted - Centered) */}
        <div className="py-10 border-t border-gray-100 mt-12 flex flex-wrap justify-center gap-12">
          {bottomGridItems.map((item, index) => (
            <PartnerCard
              key={`bottom-${index}`}
              src={item.src}
              alt={item.alt}
              label={item.label}
              href={item.href}
              categoryTitle={item.categoryTitle}
            />
          ))}
        </div>
      </div>

      {/* Colored Blocks at Bottom */}
      <img
        src="/hero-blocks.png"
        alt="Decorative blocks"
        className="w-full h-20 sm:h-24 object-cover"
      />

      {/* Scrolling Text Loop */}
      <div className="w-full -mt-7 mb-6 -skew-y-2">
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
          className="font-gilroy-bold bg-blue-600 py-5 text-white"
          ariaLabel="IEDC Summit 2025"
        />
      </div>
    </section>
  );
};

export default Partners;