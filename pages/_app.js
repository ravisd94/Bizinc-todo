import "../app/globals.css";
import React from 'react';
import Navbar from "../components/layout/Navbar";
import App from 'next/app';

function MyApp({ Component, pageProps }) {
    return (
        <div>
          <Navbar />
          <Component {...pageProps} />
        </div>
      );
}

export default MyApp;