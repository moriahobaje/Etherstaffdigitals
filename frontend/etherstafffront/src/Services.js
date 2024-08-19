import React from 'react';

const Services = () => {
  return (
    <section id="services" className="services section">
      <div className="container section-title" data-aos="fade-up">
        <span>Our Services<br /></span>
        <h2>Our Services</h2>
        <p>Beyond Just Recruitment: A Suite of Services to Empower Your Healthcare Organization</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="card">
              <div className="card-img">
                <img src="assets/img/service-1.jpg" alt="" className="img-fluid" />
              </div>
              <h3>Recruitment Process Outsourcing (RPO) Reimagined:</h3>
              <p>
              We take the reins of your entire healthcare recruitment process, from candidate sourcing and screening to interview scheduling and onboarding.
              <br/>
              Our expertise ensures you attract top talent while you focus on core patient care activities.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="card">
              <div className="card-img">
                <img src="assets/img/service-2.jpg" alt="" className="img-fluid" />
              </div>
              <h3><a href="/" className="stretched-link">Targeted Talent Acquisition:</a></h3>
              <p>
              Leverage our in-depth knowledge of the healthcare sector to pinpoint the perfect candidates for your specific needs.
              <br/>
              We utilize targeted sourcing strategies to find hidden gems within the healthcare talent pool.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="card">
              <div className="card-img">
                <img src="assets/img/service-3.jpg" alt="" className="img-fluid" />
              </div>
              <h3><a href="/" className="stretched-link"> Locum Tenens & Temporary Staffing Solutions:</a></h3>
              <p>
              Secure qualified healthcare professionals to fill temporary gaps in your workforce.
              <br/>
              Our streamlined process ensures seamless integration of locum tenens and temporary staff without disrupting your operations.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div className="card">
              <div className="card-img">
                <img src="assets/img/service-4.jpg" alt="" className="img-fluid" />
              </div>
              <h3><a href="/" className="stretched-link"> Candidate Relationship Management (CRM):</a></h3>
              <p>
              Build and nurture relationships with top healthcare professionals through our applicant tracking system (ATS) integration.
              <br/>
              Never miss out on qualified candidates again with our robust CRM features.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
            <div className="card">
              <div className="card-img">
                <img src="assets/img/service-5.jpg" alt="" className="img-fluid" />
              </div>
              <h3>Employer Branding & Recruitment Marketing:</h3>
              <p>
              Craft a compelling employer brand that attracts the best healthcare talent in the UK.
              <br/>
              We help you showcase your unique workplace culture and values to stand out from the competition.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
            <div className="card">
              <div className="card-img">
                <img src="assets/img/service-6.jpg" alt="" className="img-fluid" />
              </div>
              <h3><a href="/" className="stretched-link">Data-Driven Recruitment Analytics:</a></h3>
              <p>
              Gain valuable insights into your recruitment process with our comprehensive data analytics.
              <br/>
              Identify areas for improvement and optimize your hiring strategy for maximum efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
