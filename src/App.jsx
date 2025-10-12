import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Highlights from './components/Highlights';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Highlights />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
