import React from 'react';

import iconNo from '../images/icon-no.svg';
import iconYes from '../images/icon-yes.svg';

const JoinGame = ({props}) => {
  const { app } = props;

  return (
    <div className="container container-center">
      <h1>Join Game</h1>
      <h3>Enter Game ID:</h3>
      <p>
        <input
          type="text"
          value={app.gameId}
          placeholder="4 letters"
          className="game-id-input"
          maxLength="4"
          onChange={(e) => props.verifyGameId(e)} />
        {
          app.isGameIdValid ? (
            <img className="icon-small" src={iconYes} alt="Correct ID" />
          ) : (
            <img className="icon-small" src={iconNo} alt="Wrong ID" />
          )
        }
      </p>
      {
        app.isGameIdValid ? (
          <div className="options">
            <input
              type="radio"
              id="player-type-witness"
              name="player-type"
              value="witness"
              onChange={e => props.updatePlayerType(e)}
              checked={app.playerType === 'witness'}
            />
            <label htmlFor="player-type-witness">Witness</label>
            <input
              type="radio"
              id="player-type-detective"
              name="player-type"
              value="detective"
              onChange={e => props.updatePlayerType(e)}
              checked={app.playerType === 'detective'}
            />
            <label htmlFor="player-type-detective">Detective</label>
          </div>
        ) : null
      }
      {
        app.playerType ? (
          <button className="btn btn-block btn-home " onClick={() => props.updateScreen('game')}>Start Game</button>
        ) : null
      }
    </div>
  )
};

export default JoinGame;
