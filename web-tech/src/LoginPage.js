import React from 'react';
import './LoginPage.css';

const LoginPage = ({ onLoginClick }) => {
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
    </div>
  );
};

export default LoginPage;
