// Footer.js

import React from 'react';

const Footer = () => {
    return (
        <footer id="footer" className="footer">

            <div className="container footer-top">
                <div className="row gy-4">
                    <div className="col-lg-5 col-md-12 footer-about">
                        <a href="index.html" className="logo d-flex align-items-center">
                            <span className="sitename">Etherstaff Ltd.</span>
                        </a>
                        <p>
                            Etherstaff Ltd. goes beyond simply connecting you with top healthcare talent. We offer a comprehensive suite of services designed to address every aspect of your recruitment needs, allowing you to build a high-performing healthcare team. From streamlining the entire process to building a strong employer brand, we have the expertise to empower your organization.
                        </p>
                        <div className="social-links d-flex mt-4">
                            <a href="/"><i className="bi bi-twitter-x"></i></a>
                            <a href="/"><i className="bi bi-facebook"></i></a>
                            <a href="/"><i className="bi bi-instagram"></i></a>
                            <a href="/"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </div>

                    <div className="col-lg-2 col-6 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About us</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/">Terms of service</a></li>
                            <li><a href="/">Privacy policy</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-6 footer-links">
                        <h4>Our Services</h4>
                        <ul>
                            <li><a href="/services">Recruitment Process Outsourcing</a></li>
                            <li><a href="/services">Targeted Talent Acquisition:</a></li>
                            <li><a href="/services"> Locum Tenens & Temporary Staffing Solutions</a></li>
                            <li><a href="/services"> Candidate Relationship Management</a></li>
                            <li><a href="/services">Data-Driven Recruitment Analytics</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                        <h4>Contact Us</h4>
                        <p>4th Floor,252-262 Romford Road, London<br />
                            E7 9HZ</p>
                        <p>United Kingdom</p>
                        <p className="mt-4"><strong>Phone:</strong> <span>+447710650212</span></p>
                        <p><strong>Email:</strong> <span>carers@etherstaff.solutions</span></p>
                    </div>

                </div>
            </div>

            <div className="container copyright text-center mt-4">
                <p>© <span>Copyright</span> <strong className="px-1 sitename">Etherstaff</strong> <span>All Rights Reserved</span></p>
                <div className="credits">
                    Designed by <a href="https://meneja.co.ke">Kencert</a>
                </div>
            </div>

        </footer>

    );
}

export default Footer;
