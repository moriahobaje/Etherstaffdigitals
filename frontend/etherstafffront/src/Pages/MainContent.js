import React from 'react';
import Services from '../Services';

const MainContent = () => {
    return (
        <main className="main">

            <section id="hero" className="hero section">
                <img src="assets/img/world-dotted-map.png" alt="" className="hero-bg" data-aos="fade-in" />
                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h2 data-aos="fade-up">Your Favourite Recruitment Partner</h2>
                            <p data-aos="fade-up" data-aos-delay="100">
                                <h4>Looking to revolutionize healthcare recruitment in the UK?</h4>
                                Etherstaff Ltd. is your one-stop solution for streamlining the recruitment process in the ever-demanding healthcare landscape. We understand the unique challenges faced by healthcare providers and are here to bridge the gap between talent acquisition and exceptional patient care.
                            </p>                            
                            <div className="row gy-4" data-aos="fade-up" data-aos-delay="300">
                                <div className="col-lg-3 col-6">
                                    <div className="stats-item text-center w-100 h-100">
                                        <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="0" className="purecounter">232</span>
                                        <p>Clients</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-6">
                                    <div className="stats-item text-center w-100 h-100">
                                        <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="0" className="purecounter">521</span>
                                        <p>Projects</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-6">
                                    <div className="stats-item text-center w-100 h-100">
                                        <span data-purecounter-start="0" data-purecounter-end="1453" data-purecounter-duration="0" className="purecounter">1453</span>
                                        <p>Support</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-6">
                                    <div className="stats-item text-center w-100 h-100">
                                        <span data-purecounter-start="0" data-purecounter-end="32" data-purecounter-duration="0" className="purecounter">32</span>
                                        <p>Workers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 order-1 order-lg-2 hero-img">
                            <img src="assets/img/hero-img.png" className="img-fluid mb-3 mb-lg-0" alt="" />
                        </div>
                    </div>
                </div>
            </section>

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

            <Services />
        </main>
    );
}

export default MainContent;
