import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import ProfilePage from './ProfilePage.jsx';
import MoviesList from './MoviesList.jsx';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import AboutPage from './AboutPage.jsx';
import ContactPage from './ContactPage.jsx';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ email: '', password: '' });

    const handleLogin = (email, password) => {
        setIsLoggedIn(true);
        setUser({ email, password });
    };

    return (
        <Router>
            <div>
                {isLoggedIn && (
                    <nav className="navbar">
                        <Link to="/home">Home</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/movies">Movies</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/contact">Contact Us</Link>
                    </nav>
                )}
                <Routes>
                    <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/home" element={<Home />} />
                    <Route
                        path="/profile"
                        element={<ProfilePage user={user} />}
                    />
                    <Route path="/movies" element={<MoviesList />} />
                    <Route path="/register" element={<RegisterPage onRegister={handleLogin} />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
