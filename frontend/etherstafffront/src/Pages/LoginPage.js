// LoginPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {


    // const location = useLocation();

    const handleLogin = (event) => {
        event.preventDefault();
        // Handle login logic here (e.g., send credentials to backend)
        console.log('Login button clicked!');
    };

    return (
        <main className="main">
            {/* Page Title */}
            <div className="page-title" data-aos="fade" style={{ backgroundImage: 'url(assets/img/page-title-bg.jpg)' }}>
                <div className="container position-relative">
                    <h1>Login</h1>
                    <p>Enter your credentials to log in.</p>
                </div>
            </div>
            {/* End Page Title */}

            {/* Login Section */}
            <section id="login" className="card">
                <div className="container" data-aos="fade-up" data-aos-delay="100">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <form onSubmit={handleLogin} className="php-email-form card p-3" data-aos="fade-up" data-aos-delay="200">
                                <div className="row gy-4">
                                    <div className="col-md-12">
                                        <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                                    </div>
                                    <div className="col-md-12">
                                        <input type="password" className="form-control" name="password" placeholder="Your Password" required />
                                    </div>
                                    <div className="col-md-12 text-center">
                                        {/* <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Login successful. Redirecting...</div> */}
                                        <button type="submit" className='btn btn-success'>Login</button>

                                        <Link to="/signup" className='btn btn-getstarted'>Don't have an account? Sign Up</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* /Login Section */}
        </main>
    );
};

export default LoginPage;
