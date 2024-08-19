import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [forgotLoading, setForgotLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [forgotPassInput, setForgotPassInput] = useState(false);
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const styles = {
        borderRadius: '50%',
        position: 'relative',
        height: '117px',
        width: '117px',
        overflow: 'hidden',
    };

    const buttonlink = {
        background: 'none',
        border: 'none',
        color: '#50d8f3',
        cursor: 'pointer',
        font: 'inherit',
        padding: '0',
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to authenticate');
            }

            const result = await response.json();
            if (result.authenticated) {
                setForgotPassInput(false);
                setShowOtpInput(true);
                toast.success('Login successful! Please enter OTP.');
            } else {
                toast.error('Invalid username or password. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Failed to login. Please check credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp, username }),
            });

            if (!response.ok) {
                throw new Error('OTP verification failed');
            }

            const result = await response.json();
            if (result.otpValid) {
                toast.success(`OTP verification successful! Welcome ${result.user.first_name}. Redirecting to dashboard.`);
                dispatch(setUser(result.user));
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                toast.error('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            toast.error('Failed to verify OTP. Please try again.');
        }
    };

    const handleForgotPasswordClick = () => {
        setForgotPassInput(true);
        setShowOtpInput(false);
    };

    const handleForgotSubmit = async (event) => {
        event.preventDefault();
        setForgotLoading(true);

        try {
            const response = await fetch('http://localhost:5000/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Failed to send reset link');
            }

            toast.success('Reset link sent to your email.');
        } catch (error) {
            console.error('Forgot password error:', error);
            toast.error('Failed to send reset link. Please try again.');
        } finally {
            setForgotLoading(false);
        }
    };

    return (
        <main id="main" className="main">
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div className="d-flex justify-content-center py-4">
                                <a href="/" className="logo d-flex align-items-center w-auto">
                                    <img src="assets/img/logo.png" alt="" className="text-center img-fluid" style={styles} />
                                </a>
                            </div>
                            <br />

                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                        <p className="text-center small">Enter your username & password to login</p>
                                    </div>

                                    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                                        <div className="col-12">
                                            <label htmlFor="yourUsername" className="form-label">
                                                Username
                                            </label>
                                            <div className="input-group has-validation">
                                                <span className="input-group-text" id="inputGroupPrepend">
                                                    @
                                                </span>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form-control"
                                                    id="yourUsername"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    required
                                                />
                                                <div className="invalid-feedback">Please enter your username.</div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="yourPassword" className="form-label">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                id="yourPassword"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <div className="invalid-feedback">Please enter your password!</div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="remember"
                                                    value="true"
                                                    id="rememberMe"
                                                />
                                                <label className="form-check-label" htmlFor="rememberMe">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                                                {loading && (
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                )}
                                                Login
                                            </button>
                                        </div>
                                        <div className="col-12">
                                            <p className="small mb-0">
                                                Don't have an account? <a href="/signup">Create an account</a>
                                            </p>
                                            <p className="small mb-0">
                                                Forgot your password?{' '}
                                                <button
                                                    type="button"
                                                    className="link-button"
                                                    style={buttonlink}
                                                    onClick={handleForgotPasswordClick}
                                                >
                                                    Reset
                                                </button>

                                            </p>
                                        </div>
                                    </form>

                                    {forgotPassInput && (
                                        <form className="row g-3 needs-validation mt-4" noValidate onSubmit={handleForgotSubmit}>
                                            <div className="col-12">
                                                <label htmlFor="emailforgotInput" className="form-label">
                                                    Enter Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="emailforgotInput"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <div className="invalid-feedback">Please enter your email.</div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit" disabled={forgotLoading}>
                                                    {forgotLoading && (
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>
                                                    )}
                                                    Send Reset Link
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {showOtpInput && (
                                        <form className="row g-3 needs-validation mt-4" noValidate onSubmit={handleOtpSubmit}>
                                            <div className="col-12">
                                                <label htmlFor="otpInput" className="form-label">
                                                    Enter OTP
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="otpInput"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    required
                                                />
                                                <div className="invalid-feedback">Please enter OTP.</div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit">
                                                    Verify OTP
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Login;
