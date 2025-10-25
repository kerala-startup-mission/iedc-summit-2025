import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Highlights from './components/Highlights';
import Stats from './components/Stats';
import Gallery from './components/Gallery';
import Directions from './components/Directions';
import Footer from './components/Footer';

import "./fonts/ClashDisplay-Variable.ttf";
import "./fonts/Gilroy-Light.otf";
import "./fonts/Gilroy-ExtraBold.otf";
import "./fonts/Gilroy-Medium.ttf";

function App() {
  return (
    <div className="App">
          <Navbar />
          <Hero />
          <About />
          <Gallery />
          <div id="highlights">
            <Highlights />
            <Stats />
          </div>
          <Directions />
          <Footer />
    </div>
  );
}

export default App;
