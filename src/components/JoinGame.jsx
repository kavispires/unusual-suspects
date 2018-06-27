import React from 'react';

import iconNo from '../images/icon-no.svg';
import iconYes from '../images/icon-yes.svg';

const JoinGame = ({props}) => {
  const { app } = props;

  return (
    <div className="container container-center container-join">
      <h1>{ app.text[app.language].join }</h1>
      <h3>{ app.text[app.language].enter_id }</h3>
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
            <label htmlFor="player-type-witness">
              <input
                type="radio"
                id="player-type-witness"
                name="player-type"
                value="witness"
                disabled={app.playerTypeOptions === 1}
                onChange={e => props.updatePlayerType(e)}
                checked={app.playerType === 'witness'}
              />
              { app.text[app.language].witness }
            </label>
            <label htmlFor="player-type-detective">
              <input
                type="radio"
                id="player-type-detective"
                name="player-type"
                value="detective"
                disabled={app.playerTypeOptions === 0}
                onChange={e => props.updatePlayerType(e)}
                checked={app.playerType === 'detective'}
              />
              { app.text[app.language].detective }
            </label>
          </div>
        ) : null
      }
      {
        app.playerType ? (
          <button className="btn btn-block btn-home " onClick={() => props.startGame(`game-${app.playerType}`)}>{ app.text[app.language].start }</button>
        ) : null
      }
    </div>
  )
};

export default JoinGame;
