import React, { useEffect, useState } from 'react';
import './ProfilePage.css'; 

const ProfilePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail');
    const storedPassword = sessionStorage.getItem('userPassword');

    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
    } else {
      window.location.href = '/'; 
    }
  }, []);

  const maskPassword = (password) => {
    return '*'.repeat(password.length);
  };

  return (
    <div className="profile-container">
      <h2>Profile Page</h2>

      <div className="profile-info-box">
        {email && password ? (
          <>
            <div>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Password:</strong> {maskPassword(password)}</p>
            </div>
            <button className="profile-button" onClick={() => window.location.href = '/login'}>Logout</button>
          </>
        ) : (
          <p>No user information available</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
