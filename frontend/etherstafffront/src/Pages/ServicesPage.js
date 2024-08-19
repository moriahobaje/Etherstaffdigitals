// import React from 'react';
// import useMobileNavToggle from './useMobileNavToggle';
import React from 'react';
import Services from '../Services';

const ServicesPage = () => {

  // useMobileNavToggle();
  return (
    <div>  
    <main className="main">
    <div className="page-title" data-aos="fade" style={{ backgroundImage: 'url(assets/img/page-title-bg.jpg)' }}>
          <div className="container position-relative">
            <h1>Services</h1>
            <p>Etherstaff Ltd.: The future of healthcare recruitment is here.
            </p>
            <nav className="breadcrumbs">
              <ol>
                <li><a href="/">Home</a></li>
                <li className="current">Services</li>
              </ol>
            </nav>
          </div>
        </div>
        <Services/>
      </main>

    </div>
  );
};

export default ServicesPage;
