import React from 'react';
import './style.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="navbar">
        <div className="logo">MediaPlanner</div>
        <nav>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
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

export default LandingPage;