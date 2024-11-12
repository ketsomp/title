import React from 'react';
import './RegisterPage.css';

const RegisterPage = ( {onRegisterClick, onLoginClick} ) => {

  return (
    <div className="register-page">
      <h2>Register an Account</h2>
      <form>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />

        <button type="submit" onClick={() => {
          onRegisterClick();
        }}>
          Register
          </button>
      </form>
      <p>
        Already have an account? <a href="/login" style={{ color: 'blue' }} onClick={onLoginClick}>Login</a>
      </p>
    </div>
  );
};

export default RegisterPage;
