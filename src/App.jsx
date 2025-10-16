import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Highlights from './components/Highlights';
import Stats from './components/Stats';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Directions from './components/Directions';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <div id="highlights">
        <Highlights />
        <Stats />
      </div>
      <Gallery />
      {/* <Contact /> */}
      <Directions />
      <Footer />
    </div>
  );
}

export default App;
