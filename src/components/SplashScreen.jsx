import React from 'react';

import logo from '../images/logo.svg';

import { LoadingIcon } from './Icons';

const SplashScreen = () => (
  <div className="container container-center">
    <img className="logo-splash" src={logo} alt="Logo" />
    <LoadingIcon />
  </div>
);

export default SplashScreen;
