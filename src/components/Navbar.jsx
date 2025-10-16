import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import logo from '/iedc-summit-25-logo.png';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [activeHref, setActiveHref] = useState('#home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  const items = useMemo(() => [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Highlights', href: '#highlights' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
    { label: 'Register', href: '#register' }
  ], []);

  const ease = 'power2.easeOut';

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    
    // Special case for register - scroll to contact section
    const actualTargetId = targetId === 'register' ? 'contact' : targetId;
    const targetElement = document.getElementById(actualTargetId);
    
    if (targetElement) {
      const navbarHeight = 80; // Offset for fixed navbar
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      setActiveHref(href);
      setIsMobileMenuOpen(false);
    }
  };

  // Intersection Observer for active section tracking
  useEffect(() => {
    const sections = items.map(item => {
      const targetId = item.href.substring(1);
      // Map register to contact since register section doesn't exist
      const actualId = targetId === 'register' ? 'contact' : targetId;
      return {
        id: actualId,
        href: item.href,
        originalId: targetId
      };
    }).filter((section, index, self) => 
      // Remove duplicate contact entries
      index === self.findIndex(s => s.id === section.id)
    );

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = sections.find(s => s.id === entry.target.id);
          if (section) {
            setActiveHref(section.href);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);
  const baseColor = '#ffffff';
  const pillColor = '#2563eb';
  const hoveredPillTextColor = '#000000';
  const resolvedPillTextColor = '#ffffff';

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
    }

    const logoEl = logoRef.current;
    const navItems = navItemsRef.current;

    if (logoEl) {
      gsap.set(logoEl, { scale: 0 });
      gsap.to(logoEl, { scale: 1, duration: 0.6, ease });
    }

    if (navItems) {
      gsap.set(navItems, { width: 0, overflow: 'hidden' });
      gsap.to(navItems, { width: 'auto', duration: 0.6, ease });
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease]);

  // Effect to keep active pill in hover state
  useEffect(() => {
    // Small delay to ensure timelines are set up
    const timer = setTimeout(() => {
      items.forEach((item, i) => {
        const isActive = activeHref === item.href;
        const tl = tlRefs.current[i];
        if (!tl) return;

        activeTweenRefs.current[i]?.kill();
        
        if (isActive) {
          // Keep active item in "hovered" state
          activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
            duration: 0.4,
            ease,
            overwrite: 'auto'
          });
        } else {
          // Return to normal state
          activeTweenRefs.current[i] = tl.tweenTo(0, {
            duration: 0.4,
            ease,
            overwrite: 'auto'
          });
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [activeHref, items, ease]);

  const handleEnter = i => {
    const item = items[i];
    const isActive = activeHref === item.href;
    // Don't animate on hover if it's already active
    if (isActive) return;

    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = i => {
    const item = items[i];
    const isActive = activeHref === item.href;
    // Don't animate on leave if it's active (keep it in hover state)
    if (isActive) return;

    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.4,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }
  };

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text': resolvedPillTextColor,
    '--nav-h': '42px',
    '--logo': '36px',
    '--pill-pad-x': '18px',
    '--pill-gap': '3px'
  };

  return (
    <div className="fixed top-4 z-[1000] w-full left-0 md:w-auto md:left-1/2 md:-translate-x-1/2">
      <nav
        className="w-full md:w-max flex items-center justify-between md:justify-start box-border px-4 md:px-0"
        aria-label="Primary"
        style={cssVars}
      >
        <a
          href="#home"
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          ref={logoRef}
          className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
          style={{
            width: 'var(--nav-h)',
            height: 'var(--nav-h)',
            background: 'var(--base, #000)'
          }}
        >
          <img src={logo} alt="IEDC Logo" ref={logoImgRef} className="w-full h-full object-cover block" />
        </a>

        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex ml-2"
          style={{
            height: 'var(--nav-h)',
            background: 'var(--base, #000)'
          }}
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 p-[3px] h-full"
            style={{ gap: 'var(--pill-gap)' }}
          >
            {items.map((item, i) => {
              const pillStyle = {
                background: 'var(--pill-bg, #fff)',
                color: 'var(--pill-text, var(--base, #000))',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)'
              };

              return (
                <li key={item.href} role="none" className="flex h-full">
                  <a
                    role="menuitem"
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[14px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0"
                    style={pillStyle}
                    aria-label={item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                      style={{
                        background: 'var(--base, #000)',
                        willChange: 'transform'
                      }}
                      aria-hidden="true"
                      ref={el => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack relative inline-block leading-[1] z-[2]">
                      <span
                        className="pill-label relative z-[2] inline-block leading-[1]"
                        style={{ willChange: 'transform' }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                        style={{
                          color: 'var(--hover-text, #fff)',
                          willChange: 'transform, opacity'
                        }}
                        aria-hidden="true"
                      >
                        {item.label}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative"
          style={{
            width: 'var(--nav-h)',
            height: 'var(--nav-h)',
            background: 'var(--base, #000)'
          }}
        >
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center"
            style={{ background: 'var(--pill-bg, #fff)' }}
          />
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center"
            style={{ background: 'var(--pill-bg, #fff)' }}
          />
        </button>
      </nav>

      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[3em] left-4 right-4 rounded-[27px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-[998] origin-top"
        style={{
          ...cssVars,
          background: 'var(--base, #f0f0f0)'
        }}
      >
        <ul className="list-none m-0 p-[3px] flex flex-col gap-[3px]">
          {items.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block py-3 px-4 text-[16px] font-medium rounded-[50px] transition-all duration-200"
                style={{
                  background: 'var(--pill-bg, #fff)',
                  color: 'var(--pill-text, #fff)'
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
