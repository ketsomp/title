import React from 'react';
import './LoginPage.css';

const LoginPage = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div className="login-page">
      <h2>Login to Your Account</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />

        <button type="button" onClick={() => {
          console.log("Login button clicked");
          onLoginClick();
        }}>
          Login
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <span className="register-link" onClick={onRegisterClick}>
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
