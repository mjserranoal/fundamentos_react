import React from 'react';
import classNames from 'classnames';
import defaultPhoto from '../../assets/default-profile.png';
import './Photo.css';

const Photo = ({ photo }) => {
  return (
    <img
      className={classNames('photo', 'advert-photo')}
      src={photo ? photo : defaultPhoto}
      alt=""
    />
  );
};

export default Photo;
