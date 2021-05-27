import React, { useEffect, useState } from 'react';

import Arrived from './components/Arrived';
import Browse from './components/Browse';
import Client from './components/Client';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    (async function() {
      const response = await fetch('https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=10&offset=0&$order=asc', {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'X-Api-Key': process.env.REACT_APP_API_KEY
        }
      })

      const { nodes } = await response.json()
      setItems(nodes)
    })()
  }, [])
  return (
    <>
    <Header />
    <Hero />
    <Browse />
    <Arrived items={items} />
    <Client />
    <Menu />
    <Footer />
    </>
  );
}

export default App;
