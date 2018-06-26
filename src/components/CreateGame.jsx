import React from 'react';

import { LoadingIcon } from './Icons';

const CreateGame = ({props}) => {
  const { app } = props;


  return (
    <div className="container container-center container-create">
      <h1>{ app.text[app.language].create }</h1>
      {
        !app.gameId ? (
          <div className="loading-create-game">
            <LoadingIcon />
            <h3>{ app.text[app.language].create_rule0 }</h3>
          </div>
        ) : (
          <div className="options">
            <p>
              { app.text[app.language].create_rule1 }<br />
              { app.text[app.language].create_rule2 }<br />
              { app.text[app.language].create_rule3 }
            </p>
            <h3>{ app.text[app.language].game_id }</h3>
            <input type="text" value={app.gameId} className="game-id-input" readOnly />
            <button className="btn btn-block" onClick={() => props.updateScreen('join')}>{ app.text[app.language].join }</button>
          </div>
        )
      }
    </div>
  )
};

export default CreateGame;
