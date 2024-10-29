const React = require('react');
// Replace other imports with require statements as well.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// /Users/aniketsompura/Documents/Github/title/index.js


function App() {
    return (
        <div className="container">
            <header className="header">
                <h1>Media List Planner</h1>
                <p>Plan and organize your media consumption effortlessly</p>
            </header>
            <main className="main-content">
                <button className="cta-button">Get Started</button>
            </main>
            <footer className="footer">
                <p>&copy; 2023 Media List Planner. All rights reserved.</p>
            </footer>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));