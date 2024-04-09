import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Extend the state to include user details along with isAuthenticated
    const [authState, setAuthState] = useState({
        isAuthenticated: !!localStorage.getItem('token'),
        user: null, // Additional user info could be stored here
    });

    useEffect(() => {
        // Optionally, retrieve and set user details from localStorage or fetch from backend
        const user = localStorage.getItem('user');
        if (user) {
            setAuthState((prevState) => ({ ...prevState, user: JSON.parse(user) }));
        }
    }, []);

    const login = (token, userDetails) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userDetails)); // Store user details
        setAuthState({ isAuthenticated: true, user: userDetails });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ isAuthenticated: false, user: null });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
