import React, { useEffect, useState } from 'react';

import Arrived from './components/Arrived';
import Browse from './components/Browse';
import Client from './components/Client';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Offline from './components/Offline';
import Splash from './pages/Splash';

function App() {
  const [items, setItems] = useState( [] )
  const [isLoading, setIsLoading] = useState( true );
  const [offlineStatus, setOfflineStatus] = useState( !navigator.onLine )

  const handleOfflineStatus = () => setOfflineStatus( !navigator.onLine )

  useEffect( () => {
    ( async function () {
      setIsLoading( true );
      const response = await fetch( 'https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=10&offset=0&$order=asc', {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'X-Api-Key': process.env.REACT_APP_API_KEY
        }
      } )

      const {nodes} = await response.json()
      setItems( nodes )

      const script = document.createElement( 'script' )
      script.src = '/carousel.js';
      script.async = false;
      document.body.appendChild( script )
    } )()

    handleOfflineStatus()
    window.addEventListener( 'online', handleOfflineStatus )
    window.addEventListener( 'offline', handleOfflineStatus )

    setTimeout( () => {
      setIsLoading( false );
    }, 1500 )

    return () => {
      window.removeEventListener( 'online', handleOfflineStatus )
      window.removeEventListener( 'offline', handleOfflineStatus )
    }
  }, [offlineStatus] )

  return (
    <>
      {isLoading ? <Splash /> : (
        <>
          <Header />
          <Hero />
          <Browse />
          <Arrived items={items} />
          <Client />
          <Menu />
          <Footer />
        </>
      )}
      {offlineStatus && <Offline />}
    </>
  );
}

export default App;
