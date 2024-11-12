import React from 'react';
import './UserDetails.css';

const UserDetails = ({ user }) => {
  return (
    <div className="user-details">
      <img src={user.imageUrl} alt={`${user.name}'s profile`} className="user-image" />
      <h1 className="user-name">{user.name}</h1>
      <p className="user-email">{user.email}</p>
      <p className="user-bio">{user.bio}</p>
    </div>
  );
};

export default UserDetails;
