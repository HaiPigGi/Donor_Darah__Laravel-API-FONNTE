"use client";
import React from 'react';

const profileComponent = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Add more profile details as needed */}
    </div>
  );
};

export default profileComponent;
