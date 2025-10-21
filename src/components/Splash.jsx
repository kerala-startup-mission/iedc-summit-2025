import React, { useEffect, useState, useRef } from 'react';
import logo from '/iedc-summit-25-logo.png';

const Splash = ({ onDismiss }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoFadeOut, setVideoFadeOut] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !showVideo) {
        e.preventDefault();
        handleDismiss();
      }
    };

    const handleClick = () => {
      if (!showVideo) {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, [showVideo]);

  // Handle video end
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;

    const handleVideoEnd = () => {
      setVideoFadeOut(true);
      setTimeout(() => {
        onDismiss();
      }, 800);
    };

    video.addEventListener('ended', handleVideoEnd);
    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [showVideo, onDismiss]);

  const handleDismiss = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowVideo(true);
      setFadeOut(false);
    }, 800);
  };

  // Video Screen
  if (showVideo) {
    return (
      <div
        className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-800 ${
          videoFadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        >
          <source src="/splash.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Splash Screen
  return (
    <div
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-800 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-20 w-80 h-80 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 space-y-8">
        {/* Logo with Animation */}
        <div className="animate-fade-in-down">
          <img
            src={logo}
            alt="IEDC Summit 2025 Logo"
            className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Main Text */}
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Welcome to
          </h1>
          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            IEDC SUMMIT 2025
          </h2>
          <p className="text-lg md:text-2xl text-slate-300 font-light">
            10th Anniversary Edition
          </p>
        </div>

        {/* Tagline */}
        <div className="text-xl md:text-3xl text-blue-200 font-semibold mt-6 animate-fade-in">
          "Dare to Disrupt"
        </div>

        {/* CTA Text */}
        <div className="text-center text-slate-300 text-sm md:text-base mt-12 space-y-2 animate-bounce">
          <p>Click anywhere or press</p>
          <p className="text-white font-bold text-lg">SPACEBAR</p>
          <p>to continue</p>
        </div>

        {/* Divider */}
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-300 rounded-full mt-8 animate-pulse" />

        {/* Footer Text */}
        <p className="text-slate-400 text-xs md:text-sm mt-12">
          LBS College of Engineering, Kasaragod | 2025
        </p>
      </div>
    </div>
  );
};

export default Splash;
