import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Camera, Aperture, Upload, Download, RefreshCw, X, Image as ImageIcon, Move, Plus, Minus } from 'lucide-react';
const DpFramer = () => {
  const location = useLocation();
  // --- Configuration ---
  const CANVAS_SIZE = 1080;
  const WINDOW = {
    x: 540,
    y: 209,
    w: 423,
    h: 474,
    radius: 40 // Rounded corner radius
  };

  // --- State ---
  const [isOpen, setIsOpen] = useState(false);
  const [imageSource, setImageSource] = useState(null); // The raw image/video element
  const [generatedImage, setGeneratedImage] = useState(null); // The final base64 output
  
  // Transform State (Zoom & Pan)
  const [transform, setTransform] = useState({ k: 1, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Refs
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);

  // --- Initialization ---

  // 1. Load the Frame Overlay
  useEffect(() => {
    const img = new Image();
    img.src = '/frame.png'; // Ensure this file exists in /public
    img.onload = () => { frameRef.current = img; };
  }, []);

  // 2. Cleanup on close
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setImageSource(null);
      setGeneratedImage(null);
    }
  }, [isOpen]);

  // 3. Auto-open on /dp route
  useEffect(() => {
    if (location.pathname === '/dp') {
      setIsOpen(true);
    }
  }, [location]);

  // 4. Lock Body Scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // --- Core Graphics Logic ---

  const draw = () => {
    if (!canvasRef.current || !frameRef.current) return;
    
    // Schedule next frame
    animationFrameRef.current = requestAnimationFrame(draw);

    const ctx = canvasRef.current.getContext('2d');
    
    // 1. Clear Canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 2. Define the Window (Clipping Path)
    // We draw the user's image ONLY inside this shape
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(WINDOW.x, WINDOW.y, WINDOW.w, WINDOW.h, WINDOW.radius);
    ctx.clip(); // <--- MAGIC: Nothing draws outside this line

    // 3. Draw User Image/Video
    if (imageSource) {
      // Determine source dimensions
      const srcW = imageSource.videoWidth || imageSource.width || 0;
      const srcH = imageSource.videoHeight || imageSource.height || 0;

      if (srcW > 0 && srcH > 0) {
        // Calculate "Cover" fit for the Window
        const scaleW = WINDOW.w / srcW;
        const scaleH = WINDOW.h / srcH;
        const baseScale = Math.max(scaleW, scaleH);

        // Apply User Zoom
        const finalScale = baseScale * transform.k;
        
        const drawW = srcW * finalScale;
        const drawH = srcH * finalScale;

        // Center logic:
        // Start at center of Window, apply user offset, subtract half image width
        const centerX = WINDOW.x + (WINDOW.w / 2);
        const centerY = WINDOW.y + (WINDOW.h / 2);

        const drawX = centerX + transform.x - (drawW / 2);
        const drawY = centerY + transform.y - (drawH / 2);

        // Draw
        if (imageSource.tagName === 'VIDEO') {
          // Mirror camera
          ctx.translate(centerX, centerY);
          ctx.scale(-1, 1);
          ctx.translate(-centerX, -centerY);
          // Invert X drag for mirrored feel
          ctx.drawImage(imageSource, centerX - transform.x - (drawW/2), drawY, drawW, drawH);
        } else {
          ctx.drawImage(imageSource, drawX, drawY, drawW, drawH);
        }
      }
    } else {
      // Placeholder gray background if no image yet
      ctx.fillStyle = "#e5e7eb";
      ctx.fillRect(WINDOW.x, WINDOW.y, WINDOW.w, WINDOW.h);
      ctx.fillStyle = "#9ca3af";
      ctx.font = "bold 40px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("No Image", WINDOW.x + WINDOW.w/2, WINDOW.y + WINDOW.h/2);
    }
    
    // Stop Clipping
    ctx.restore();

    // 4. Draw Frame Overlay ON TOP
    ctx.drawImage(frameRef.current, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
  };

  // Start/Stop Loop
  useEffect(() => {
    if (isOpen && !generatedImage) {
      draw();
    } else {
      cancelAnimationFrame(animationFrameRef.current);
    }
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isOpen, imageSource, transform, generatedImage]);


  // --- Input Handlers ---

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const img = new Image();
      img.onload = () => {
        stopCamera();
        setImageSource(img);
        setTransform({ k: 1, x: 0, y: 0 }); // Reset transforms
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1080 }, height: { ideal: 1080 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setImageSource(videoRef.current);
        setTransform({ k: 1, x: 0, y: 0 });
      }
    } catch (err) {
      alert("Could not access camera");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  const handleCapture = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      setGeneratedImage(dataUrl);
      stopCamera();
    }
  };

  const reset = () => {
    setGeneratedImage(null);
    setImageSource(null);
    stopCamera();
    setTransform({ k: 1, x: 0, y: 0 });
  };

  // --- Interaction (Drag & Zoom) ---

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    // Scale sensitivity based on canvas CSS display size vs actual size
    // For simplicity, we just use a multiplier suitable for the modal size
    const sensitivity = 2.5; 

    setTransform(prev => ({
      ...prev,
      x: prev.x + (dx * sensitivity),
      y: prev.y + (dy * sensitivity)
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-2 md:top-auto md:right-auto md:bottom-6 md:left-6 z-50 flex items-center gap-2 px-2 py-4 md:px-6 md:py-4 bg-blue-600 text-white rounded-xl md:rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-105 font-bold tracking-wide"
      >
        <Aperture size={24} /> <span className="">Get DP</span>
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800">DP Generator</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center gap-6">
              
              {/* Canvas Container */}
              <div 
                className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-inner ring-1 ring-gray-200 cursor-move touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              >
                {/* Result Image (Static) */}
                {generatedImage ? (
                  <img src={generatedImage} alt="Generated DP" className="w-full h-full object-contain" />
                ) : (
                  /* Live Canvas */
                  <>
                    <canvas 
                      ref={canvasRef} 
                      width={1080} 
                      height={1080} 
                      className="w-full h-full object-contain pointer-events-none" 
                    />
                    
                    {/* Drag Hint Overlay (Only if image present) */}
                    {imageSource && (
                      <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full pointer-events-none backdrop-blur-sm flex items-center gap-1">
                        <Move size={12} /> Drag to adjust
                      </div>
                    )}
                  </>
                )}

                {/* Hidden Video Source */}
                <video ref={videoRef} className="hidden" playsInline muted autoPlay />
              </div>

              {/* Controls */}
              <div className="w-full space-y-6">
                
                {generatedImage ? (
                  // --- Download View ---
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={reset} className="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors">
                      <RefreshCw size={20} /> Create New
                    </button>
                    <a 
                      href={generatedImage} 
                      download="IEDC-Summit-DP.png" 
                      className="flex items-center justify-center gap-2 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg"
                    >
                      <Download size={20} /> Download
                    </a>
                  </div>
                ) : (
                  // --- Editor View ---
                  <>
                    {imageSource ? (
                      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                        {/* Zoom Control */}
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                             <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Zoom</span>
                             <span className="text-xs font-mono text-gray-500">{Math.round(transform.k * 100)}%</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button onClick={() => setTransform(t => ({...t, k: Math.max(0.5, t.k - 0.1)}))} className="p-2 text-gray-400 hover:text-gray-600"><Minus size={16}/></button>
                            <input 
                              type="range" min="0.5" max="3" step="0.01" 
                              value={transform.k}
                              onChange={(e) => setTransform(prev => ({ ...prev, k: parseFloat(e.target.value) }))}
                              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <button onClick={() => setTransform(t => ({...t, k: Math.min(3, t.k + 0.1)}))} className="p-2 text-gray-400 hover:text-gray-600"><Plus size={16}/></button>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                           <button onClick={reset} className="p-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50">
                            <RefreshCw size={20} />
                           </button>
                           <button onClick={handleCapture} className="flex-1 bg-blue-600 text-white rounded-xl font-bold py-4 hover:bg-blue-700 shadow-lg transition-transform active:scale-95">
                             Generate DP
                           </button>
                        </div>
                      </div>
                    ) : (
                      // --- Idle View ---
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center gap-3 py-8 rounded-2xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all group"
                        >
                          <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
                            <Upload size={24} />
                          </div>
                          <span className="font-semibold">Upload Photo</span>
                        </button>

                        <button 
                          onClick={startCamera}
                          className="flex flex-col items-center gap-3 py-8 rounded-2xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all group"
                        >
                          <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
                            <Camera size={24} />
                          </div>
                          <span className="font-semibold">Open Camera</span>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFileUpload} />
          </div>
        </div>
      )}
    </>
  );
};

export default DpFramer;