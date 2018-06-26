import React from 'react';

import logo from '../images/logo.svg';

const Home = ({props}) => (
  <div className="container container-center">
    <img className="logo-splash" src={logo} alt="Logo" />
    <div className="language-options">
      <label htmlFor="language-en">
        <input
          type="radio"
          id="lenguage-en"
          name="language"
          value="en"
          onChange={e => props.updateLanguage(e)}
          checked={props.app.language === 'en'}
        />
        English
      </label>
      <label htmlFor="language-br">
        <input
          type="radio"
          id="lenguage-br"
          name="language"
          value="br"
          onChange={e => props.updateLanguage(e)}
          checked={props.app.language === 'br'}
        />
        Português
      </label>
    </div>
    <div className="home-options">
      <button className="btn btn-block btn-home " onClick={() => props.initGame()}>{ props.app.text[props.app.language].create }</button>
      <button className="btn btn-block btn-home " onClick={() => props.updateScreen('join')}>{ props.app.text[props.app.language].join }</button>
    </div>
  </div>
);

export default Home;
