import React, { useState } from 'react';
import './style.css';
import ContactPage from './contactPage';
import AboutPage from './AboutPage';

const LandingPage = ({ onContactClick }) => {
  return (
    <div className="landing-page">
      <section className="hero">
        <h1>Your Personal Media Planner</h1>
        <p>Organize, track, and discover movies, series, and books effortlessly.</p>
        <button className="cta-button">Get Started</button>
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

  return (
    <div>
      <header className="navbar">
        <div className="logo">MediaPlanner</div>
        <nav>
          <a href="#" onClick={handleFeaturesClick}>Features</a>
          <a href="#" onClick={handleAboutClick}>About</a>
          <a href="#" onClick={handleContactClick}>Contact</a>
        </nav>
      </header>
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'about' && <AboutPage />}
    </div>
  );
};

export default App;