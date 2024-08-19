// Layout.js
import React from 'react';
import useMobileNavToggle from './useMobileNavToggle';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  useMobileNavToggle();

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
