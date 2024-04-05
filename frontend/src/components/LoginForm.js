import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Consolidated import for Link
import "./login.css"; // Make sure the path is correct
// Ensure the paths to these images are correct for your project structure
import appLogo from '../images/background.jpeg';
import backgroundImage from '../images/logo.jpeg';
import { FcGoogle } from 'react-icons/fc';

const LoginForm = () => {
    const [user, setUser] = useState({
        email: '', // Changed from username to email
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

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user), // Email is already part of the user state
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to login');
            }

            localStorage.setItem('token', data.token); // Assuming the token is sent back on successful login
            navigate('/dashboard'); // Redirect to the dashboard upon successful login
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'An error occurred during login');
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
                <p>Don't have an account? <Link to="/" className='span-me'>Create Account</Link></p>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="login-button">Log in</button>
                </form>
                <p>Forget Password? <Link to="/forgot-password" className='span-me'>Reset Password</Link></p>
                {/* Google login button remains unchanged */}
            </div>
        </div>
    );
};

export default LoginForm;
