import React from 'react';

import iconRound from '../images/icon-round.svg';
import iconQuestion from '../images/icon-question.svg';
import iconSuspects from '../images/icon-suspects.svg';

import { LoadingIcon } from './Icons';

const WaitingPlayers = ({props}) => {
  const { app } = props;

  return (
    <div className="container container-center container-witness">
      <header className="header">
        <div className="round-count">
          <img className="icon" src={iconRound} alt="Round" /> { app.round }
        </div>
        <div className="game-id">
          { app.gameId }
        </div>
        <div className="suspects-count">
        <img className="icon" src={iconSuspects} alt="Suspects" /> { app.suspectsLeft }
        </div>
      </header>
      <div className="waiting">
        <h1>{ app.text[app.language].waiting }</h1><br />
        <LoadingIcon />
      </div>
    </div>
  )
}

export default WaitingPlayers;
