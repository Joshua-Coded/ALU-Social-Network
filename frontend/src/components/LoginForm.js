import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import appLogo from '../images/background.jpeg';
import backgroundImage from '../images/logo.jpeg';
import { FcGoogle } from 'react-icons/fc';

const LoginForm = () => {
    const [user, setUser] = useState({
        username: '',
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
        if (!user.username || !user.password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Login failed');
            }

            // Navigate to login upon successful registration
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
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
            <div className="login-container">
                <h2>Welcome back!</h2>
                <p>Don't have an account? <span className='span-me'>Create Account</span></p>
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
                    <button type="submit" className="login-button">Log in</button>
                </form>

                <p>
                    Forget Password?<span className='span-me'>Reset Password</span>
                </p>
                {/* onClick={handleGoogleLogin} */}
                <button className="google-login-button" >
                    <FcGoogle className="google-icon" />
                    Login in with Google
                </button>
            </div>
        </div>
    );

};

export default LoginForm;
