import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./register.css";
import "./register.scss";
import appLogo from '../images/background.jpeg';
import backgroundImage from '../images/logo.jpeg';
import { FcGoogle } from 'react-icons/fc';

const RegisterForm = () => {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isValidSchoolEmail = (email) => {
        return email.endsWith("@alustudent.com") || email.endsWith("@alueducation.com");
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isValidSchoolEmail(user.email)) {
            setError("Please use your (ORGANIZATION OR SCHOOL) email address.");
            return;
        }

        if (!user.firstname || !user.lastname || !user.username || !user.email || !user.password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            navigate('/login'); // Redirect on successful registration
        } catch (error) {
            console.error('Registration failed:', error);
            setError(error instanceof Error ? error.message : "An unexpected error occurred");
        }
    };


    return (
        <div className="register">
            <div className="card">
                <div className="register-left">
                    {/* className="background-section" style={{ backgroundImage: `url(${backgroundImage})` }} */}
                    {/* <div>
                        <span className="logo-and-text">
                            <img src={appLogo} alt="ALU Logo" className="alu-logo" />
                            <p className="network-text">ALU Social Network</p>
                        </span>
                    </div> */}
                    <span>
                        <img src={appLogo} alt="ALU Logo" />
                        <h5>ALU Social Network</h5>
                    </span>
                    <h1>Building Bridges, and Fostering Community</h1>
                    <p>ALU Social Network is your one-stop platform for fostering <br />
                        connections and building a vibrant community within the ALU <br />
                        ecosystem. Connect with fellow student and alumni, explore mentorship opportunities, and engage in meaningful discussion - all <br />
                        designed to enhance your professional growth, networking, and sense of belonging at ALU.</p>
                </div>
                <div className="register-right">
                    <h2>Welcome to <br /> <span className='span-me'>ALU Social Network.</span></h2>
                    <p>Have an account? <Link to="/login" className='span-me'>Login here</Link></p>

                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstname"
                                value={user.firstname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastname"
                                value={user.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
                            <button className='eyes' type="button" onClick={togglePasswordVisibility}>
                                {showPassword ? '🙈' : '👁'}
                            </button>
                        </div>
                        <button type="submit" className="register-button">Create Account</button>
                    </form>

                    {/* <p>
                        By clicking "<b>Create Account</b>", I acknowledge that I have read and do <br />
                        hereby accept the terms and conditions in the ALU social network's <br />
                        <span className='span-me'>Terms of Use</span> and <span className='span-me'>Privacy Policy.</span>
                    </p> */}
                    {/* onClick={handleGoogleLogin} */}
                    {/* <button className="google-login-button" >
                        <FcGoogle className="google-icon" />
                        Create Account with Google
                    </button> */}
                </div>
            </div>
        </div>
    );

};

export default RegisterForm;
