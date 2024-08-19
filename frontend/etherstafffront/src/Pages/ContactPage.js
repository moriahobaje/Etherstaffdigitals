// ContactPage.js
import React from 'react';

const ContactPage = () => {
  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" data-aos="fade" style={{ backgroundImage: 'url(assets/img/page-title-bg.jpg)' }}>
        <div className="container position-relative">
          <h1>Contact</h1>
          <p>Etherstaff Ltd.: The future of healthcare recruitment is here.
          </p>
          <nav className="breadcrumbs">
            <ol>
              <li><a href="/">Home</a></li>
              <li className="current">Contact</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Page Title */}

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="mb-4" data-aos="fade-up" data-aos-delay="200">            
            <iframe
              style={{ border: '0', width: '100%', height: '270px' }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.211491985578!2d0.020595776854359003!3d51.54602080788098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a797fc900001%3A0x47af68514d7e524a!2s4th%20Floor%2C%20252-262%20Romford%20Rd%2C%20London%20E7%209HZ%2C%20UK!5e0!3m2!1sen!2ske!4v1718706644844!5m2!1sen!2ske"
              frameBorder="0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title='map'
            ></iframe>
          </div>
          {/* End Google Maps */}

          <div className="row gy-4">
            <div className="col-lg-4">
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Address</h3>
                  <p>4th Floor,252-262 Romford Road, London<br />
                    E7 9HZ</p>
                  <p>United Kingdom</p>
                  <br />
                  <p>Ready to learn more?<br />
                    Contact us today and let's discuss how we can help you find the perfect talent to elevate your healthcare organization.</p>
                </div>
              </div>
              {/* End Info Item */}

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Call Us</h3>
                  <p>+447710650212</p>
                </div>
              </div>
              {/* End Info Item */}

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email Us</h3>
                  <p>carers@etherstaff.solutions</p>
                </div>
              </div>
              {/* End Info Item */}
            </div>

            <div className="col-lg-8">
              <form action="forms/contact.php" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                  </div>
                  <div className="col-md-12">
                    <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                  </div>
                  <div className="col-md-12">
                    <textarea className="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                  </div>
                  <div className="col-md-12 text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Your message has been sent. Thank you!</div>
                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
            {/* End Contact Form */}
          </div>
        </div>
      </section>
      {/* /Contact Section */}
    </main>
  );
};

export default ContactPage;
