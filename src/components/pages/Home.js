import React from 'react';
import ParticleAnimation from '../ParticleAnimation';
import HeroSection from '../HeroSection';
import About from '../About';
import Cards from '../Cards';
import Footer from '../Footer';

function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;