import React from 'react';
import ProfileCard from './ProfileCard';
import './ProfileCardList.css';

const ProfileCardList: React.FC = () => {
  return (
    <div className="profile-card-list">
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
    </div>
  );
};

export default ProfileCardList;