// import React from 'react';
// import useMobileNavToggle from './useMobileNavToggle';
import React from 'react';

const AboutPage = () => {

  // useMobileNavToggle();
  return (
    <div>  
    <main className="main">
        {/* Page Title */}
        <div className="page-title" data-aos="fade" style={{ backgroundImage: 'url(assets/img/page-title-bg.jpg)' }}>
          <div className="container position-relative">
            <h1>About</h1>
            <p>Etherstaff Ltd.: The future of healthcare recruitment is here.
            </p>
            <nav className="breadcrumbs">
              <ol>
                <li><a href="/">Home</a></li>
                <li className="current">About</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="about section">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-6 position-relative align-self-start order-lg-last order-first" data-aos="fade-up" data-aos-delay="200">
                            <img src="assets/img/about.jpg" className="img-fluid" alt="" />
                            <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox play-btn">Video</a>
                        </div>
                        <div className="col-lg-6 content order-last order-lg-first" data-aos="fade-up" data-aos-delay="100">
                            <h3>About Us</h3>
                            <p>
                            Etherstaff Ltd. is your one-stop solution for streamlining the recruitment process in the ever-demanding healthcare landscape. We understand the unique challenges faced by healthcare providers and are here to bridge the gap between talent acquisition and exceptional patient care.
                            </p>
                            <ul>
                                <li>
                                    <i className="bi bi-diagram-3"></i>
                                    <div>
                                        <h5>Recruitment outsourcing complexities:</h5>
                                        <p>Say goodbye to the inefficiencies of traditional outsourcing. Etherstaff Ltd. offers a user-friendly platform that empowers you to take control of your recruitment needs.</p>
                                    </div>
                                </li>
                                <li>
                                    <i className="bi bi-fullscreen-exit"></i>
                                    <div>
                                        <h5>Industry-specific hurdles:</h5>
                                        <p> We understand the intricacies of the healthcare industry and have designed our platform to address the specific challenges you face when finding qualified personnel.</p>
                                    </div>
                                </li>
                                <li>
                                    <i className="bi bi-broadcast"></i>
                                    <div>
                                        <h5>Process clarity and accuracy:</h5>
                                        <p>Ensure your recruitment processes are clearly defined, unambiguous, and meet the exact needs of your organization.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        {/* Stats Section */}
        {/* <section id="stats" className="stats section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter"></span>
                  <p>Clients</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" className="purecounter"></span>
                  <p>Projects</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span data-purecounter-start="0" data-purecounter-end="1453" data-purecounter-duration="1" className="purecounter"></span>
                  <p>Hours Of Support</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span data-purecounter-start="0" data-purecounter-end="32" data-purecounter-duration="1" className="purecounter"></span>
                  <p>Workers</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Team Section */}
        <section id="team" className="team section">
          <div className="container section-title" data-aos="fade-up">
            <span>Our Team
              <br/></span>
            <h2>Our Team</h2>
            <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="100">
                <div className="member">
                  <img src="assets/img/team/team-1.jpg" className="img-fluid" alt="" />
                  <div className="member-content">
                    <h4>Walter White</h4>
                    <span>Web Development</span>
                    <p>
                      Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut
                    </p>
                    <div className="social">
                      <a href="/"><i className="bi bi-twitter"></i></a>
                      <a href="/"><i className="bi bi-facebook"></i></a>
                      <a href="/"><i className="bi bi-instagram"></i></a>
                      <a href="/"><i className="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="200">
                <div className="member">
                  <img src="assets/img/team/team-2.jpg" className="img-fluid" alt="" />
                  <div className="member-content">
                    <h4>Sarah Jhinson</h4>
                    <span>Marketing</span>
                    <p>
                      Repellat fugiat adipisci nemo illum nesciunt voluptas repellendus. In architecto rerum rerum temporibus
                    </p>
                    <div className="social">
                      <a href="/"><i className="bi bi-twitter"></i></a>
                      <a href="/"><i className="bi bi-facebook"></i></a>
                      <a href="/"><i className="bi bi-instagram"></i></a>
                      <a href="/"><i className="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="300">
                <div className="member">
                  <img src="assets/img/team/team-3.jpg" className="img-fluid" alt="" />
                  <div className="member-content">
                    <h4>William Anderson</h4>
                    <span>Content</span>
                    <p>
                      Voluptas necessitatibus occaecati quia. Earum totam consequuntur qui porro et laborum toro des clara
                    </p>
                    <div className="social">
                      <a href="/"><i className="bi bi-twitter"></i></a>
                      <a href="/"><i className="bi bi-facebook"></i></a>
                      <a href="/"><i className="bi bi-instagram"></i></a>
                      <a href="/"><i className="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="testimonials section">
          <img src="assets/img/testimonials-bg.jpg" className="testimonials-bg" alt="" />
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="swiper">
              <script type="application/json" className="swiper-config">
                {`{
                  "loop": true,
                  "speed": 600,
                  "autoplay": {
                    "delay": 5000
                  },
                  "slidesPerView": "auto",
                  "pagination": {
                    "el": ".swiper-pagination",
                    "type": "bullets",
                    "clickable": true
                  }
                }`}
              </script>
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <img src="assets/img/testimonials/testimonials-1.jpg" className="testimonial-img" alt="" />
                    <h3>Saul Goodman</h3>
                    <h4>Ceo & Founder</h4>
                    <p>
                      <i className="bi bi-quote quote-icon-left"></i>
                      Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
                      <i className="bi bi-quote quote-icon-right"></i>
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <img src="assets/img/testimonials/testimonials-2.jpg" className="testimonial-img" alt="" />
                    <h3>Sara Wilsson</h3>
                    <h4>Designer</h4>
                    <p>
                      <i className="bi bi-quote quote-icon-left"></i>
                      Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.
                      <i className="bi bi-quote quote-icon-right"></i>
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <img src="assets/img/testimonials/testimonials-3.jpg" className="testimonial-img" alt="" />
                    <h3>Jena Karlis</h3>
                    <h4>Store Owner</h4>
                    <p>
                      <i className="bi bi-quote quote-icon-left"></i>
                      Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.
                      <i className="bi bi-quote quote-icon-right"></i>
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <img src="assets/img/testimonials/testimonials-4.jpg" className="testimonial-img" alt="" />
                    <h3>Matt Brandon</h3>
                    <h4>Freelancer</h4>
                    <p>
                      <i className="bi bi-quote quote-icon-left"></i>
                      Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
                      <i className="bi bi-quote quote-icon-right"></i>
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <img src="assets/img/testimonials/testimonials-5.jpg" className="testimonial-img" alt="" />
                    <h3>John Larson</h3>
                    <h4>Entrepreneur</h4>
                    <p>
                      <i className="bi bi-quote quote-icon-left"></i>
                      Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
                      <i className="bi bi-quote quote-icon-right"></i>
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default AboutPage;
