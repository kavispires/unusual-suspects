import React from 'react';

import logo from '../images/logo.svg';

const Home = ({props}) => (
  <div className="container container-center">
    <img className="logo-splash" src={logo} alt="Logo" />
    <div className="home-options">
      <button className="btn btn-block btn-home " onClick={() => props.initGame()}>Create Game</button>
      <button className="btn btn-block btn-home " onClick={() => props.updateScreen('join')}>Join Game</button>
    </div>
  </div>
);

export default Home;
