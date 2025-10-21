import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Highlights from './components/Highlights';
import Stats from './components/Stats';
import Gallery from './components/Gallery';
import Directions from './components/Directions';
import Footer from './components/Footer';
import Splash from './components/Splash';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="App">
      {showSplash ? (
        <Splash onDismiss={() => setShowSplash(false)} />
      ) : (
        <>
          <Navbar />
          <Hero />
          <About />
          <div id="highlights">
            <Highlights />
            <Stats />
          </div>
          <Gallery />
          <Directions />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
