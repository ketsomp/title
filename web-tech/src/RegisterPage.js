// RegisterPage.js
import React from 'react';
import './RegisterPage.css'; // Create a CSS file for custom styling

const RegisterPage = () => {
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    console.log('Register form submitted');
    // Add logic to handle form submission, such as API calls or validation
  };

  return (
    <div className="register-page">
      <h2>Register an Account</h2>
      <form onSubmit={handleRegisterSubmit}>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login" style={{ color: 'blue' }}>Login</a>
      </p>
    </div>
  );
};

export default RegisterPage;
