import React from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
  return (
    <div className="card">
      <div className="card__border">
        <div className="card__perfil">
          <img src="https://i.ibb.co/JxfmRS8/profile-img.png" alt="Placeholder" className="card__img" />
        </div>
      </div>

      <h3 className="card__name">Iulia Borsa</h3>
      <p className="card__profession">Medic Specialist</p>

      <div className="card__social">
        <a href="#" className="card__social-link">
          <i className="ri-instagram-line"></i>
        </a>
        <a href="#" className="card__social-link">
          <i className="ri-facebook-circle-line"></i>
        </a>
        <a href="#" className="card__social-link">
          <i className="ri-twitter-line"></i>
        </a>
      </div>

      <div className="card__info">
        <div className="card__info-group">
          <h3 className="card__info-number">1,9K</h3>
          <p className="card__info-description">Followers</p>
        </div>

        <div className="card__info-group">
          <h3 className="card__info-number">98</h3>
          <p className="card__info-description">Following</p>
        </div>

        <div className="card__info-group">
          <h3 className="card__info-number">23</h3>
          <p className="card__info-description">Posts</p>
        </div>
      </div>

      <div className="card__button-container">
        <button className="card__button">Follow</button>
      </div>
    </div>
  );
};

export default ProfileCard;