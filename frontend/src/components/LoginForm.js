import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Adjust the import path as necessary
// import "./login.css";
import "./login.scss";
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

    // Use the useAuth hook
    const { login } = useAuth();

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
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'invalid credentials, check your password or email');
            }

            // Call the login method from useAuth hook
            login(data.token, data.user); // Assuming data.user contains user info

            navigate('/dashboard'); // Redirect to the dashboard upon successful login
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'An error occurred during login');
        }
    };

    return (
        <div className="login">
            <div className="card">
                <div className="left">
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
                <div className="right">
                    <h2>Welcome back!</h2>
                    <p>Don't have an account? <Link to="/" className='span-me'>Create Account</Link></p>
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
                    <p>Forget Password? <Link to="/forgot-password" className='span-me'>Reset Password</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
