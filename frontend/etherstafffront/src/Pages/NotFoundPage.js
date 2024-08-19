import React from 'react';

const NotFoundPage = () => {


  return (
    <div>  
    <main className="main">
    <div className="page-title" data-aos="fade" style={{ backgroundImage: 'url(assets/img/page-title-bg.jpg)' }}>
          <div className="container position-relative">
            <h1>Not Found</h1>
            <p>Page Not Found.</p>
            <nav className="breadcrumbs">
              <ol>
                <li><a href="/">Home</a></li>
                <li className="current">Not Found</li>
              </ol>
            </nav>
          </div>
        </div>       
      </main>

    </div>
  );
};

export default NotFoundPage;
