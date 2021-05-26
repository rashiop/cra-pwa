import React from 'react';

import Arrived from './components/Arrived';
import Browse from './components/Browse';
import Client from './components/Client';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';

function App() {
  return (
    <>
    <Header />
    <Hero />
    <Browse />
    <Arrived />
    <Client />
    <Menu />
    <Footer />
    </>
  );
}

export default App;
