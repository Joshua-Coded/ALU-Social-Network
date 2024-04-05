import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./register.css";
import appLogo from '../images/background.jpeg';
import backgroundImage from '../images/logo.jpeg'; // Ensure these paths are correct
import { FcGoogle } from 'react-icons/fc'; // Assuming you're using react-icons

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
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Ensure all fields are filled
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
                body: JSON.stringify({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Registration failed');
            }

            // Navigate to login upon successful registration
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            setError(error instanceof Error ? error.message : "An unexpected error occurred");
        }
    };

    return (
        <div className="container">
            <div className="background-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <span className="logo-and-text">
                    <img src={appLogo} alt="ALU Logo" className="alu-logo" />
                    <p className="network-text">ALU Social Network</p>
                </span>
                <span className='span-us'>
                    <h1>Building Bridges, <br /> and Fostering Community</h1>
                    <p className='small-text'>ALU Social Network is your one-stop platform for fostering <br />
                        connections and building a vibrant community within the ALU <br />
                        ecosystem. Connect with fellow student and alumni, explore mentorship opportunities, and engage in meaningful discussion - all <br />
                        designed to enhance your professional growth, networking, and sense of belonging at ALU.</p>
                </span>
            </div>
            <div className="register-container">
                <h2>Welcome to <br /> <span className='span-me'>ALU Social Network.</span></h2>
                <p>Already have an account ? <span className='span-me'>Log In</span></p>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
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
                        <button type="button" onClick={togglePasswordVisibility}>
                            {showPassword ? '🙈' : '👁'}
                        </button>
                    </div>
                    <button type="submit" className="register-button">Create Account</button>
                </form>

                <p>
                    By clicking "<b>Create Account</b>", I acknowledge that I have read and do <br />
                    hereby accept the terms and conditions in the ALU social network's <br />
                    <span className='span-me'>Terms of Use</span> and <span className='span-me'>Privacy Policy.</span>
                </p>
                {/* onClick={handleGoogleLogin} */}
                <button className="google-login-button" >
                    <FcGoogle className="google-icon" />
                    Create Account with Google
                </button>
            </div>
        </div>
    );

};

export default RegisterForm;
