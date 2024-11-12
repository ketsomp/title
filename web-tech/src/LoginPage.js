import React from 'react';
import './LoginPage.css';

const LoginPage = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div className="login-page">
      <h2>Login to Your Account</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />

        <button type="submit" onClick={() => {
          onLoginClick();
        }}>
          Login
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <span onClick={onRegisterClick}>
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
