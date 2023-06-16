import React from 'react';
import classNames from 'classnames';
import defaultPhoto from '../../assets/default-profile.png';
import './Photo.css';

const Photo = ({ className, src, ...props }) => (
  <img
    className={classNames('photo', className)}
    src={src ? src :defaultPhoto}
    alt=""
    {...props}
  />
);

export default Photo;
