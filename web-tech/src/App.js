import React, { useState } from 'react';
import './LandingPage.css';
import ContactPage from './contactPage';
import AboutPage from './AboutPage';
import LoginPage from './LoginPage';
import ListPage from './ListPage';
import RegisterPage from './RegisterPage';

const LandingPage = ({ onLoginClick }) => {
  return (
    <div className="landing-page">
      <section className="hero">
        <h1>Your Personal Media Planner</h1>
        <p>Organize, track, and discover movies, series, and books effortlessly.</p>
        <button className="cta-button" onClick={onLoginClick}>Get Started</button>
      </section>
      <section className="features" id="features">
        <div className="feature">
          <h2>Plan Ahead</h2>
          <p>Create lists and stay on top of your watchlist and reading list.</p>
        </div>
        <div className="feature">
          <h2>Track Progress</h2>
          <p>Mark items as watched or read and see your progress over time.</p>
        </div>
        <div className="feature">
          <h2>Discover New Titles</h2>
          <p>Get recommendations based on your preferences.</p>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 MediaPlanner. All rights reserved.</p>
      </footer>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleContactClick = (e) => {
    e.preventDefault();
    setCurrentPage('contact');
  };

  const handleFeaturesClick = (e) => {
    e.preventDefault();
    setCurrentPage('landing');
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    setCurrentPage('about');
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setCurrentPage('login');
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setCurrentPage('register');
  };

  const handleLoginSubmit = () => {
    setCurrentPage('list');
    console.log("Navigating to Login Page");
  };

  return (
    <div>
      <header className="navbar">
        <div className="logo">title</div>
        <nav>
          <a href="https://vndb.org" onClick={handleFeaturesClick}>Home</a>
          <a href="https://vndb.org" onClick={handleAboutClick}>About</a>
          <a href="https://vndb.org" onClick={handleContactClick}>Contact</a>
        </nav>
      </header>
      {currentPage === 'landing' && (
        <LandingPage onLoginClick={handleLoginClick} />
      )}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'login' && (
  <LoginPage onLoginClick={handleLoginSubmit} onRegisterClick={handleRegisterClick} />
)}

      {currentPage === 'register' && <RegisterPage />}
      {currentPage === 'list' && <ListPage />}
    </div>
  );
};

export default App;
