import React from 'react';

import { LoadingIcon } from './Icons';

const CreateGame = ({props}) => {
  const { app } = props;


  return (
    <div className="container container-center container-create">
      <h1>Create Game</h1>
      {
        !app.gameId ? (
          <div className="loading-create-game">
            <LoadingIcon />
            <h3>Creating game...</h3>
          </div>
        ) : (
          <div className="options">
            <p>
              Your game is ready!<br />
              You need two players: one as a Witness and one as a Detective. <br />
              Send the game id to a friend and ask they to join you!
            </p>
            <h3>Game ID:</h3>
            <input type="text" value={app.gameId} className="game-id-input" readOnly />
            <button className="btn btn-block" onClick={() => props.updateScreen('join')}>Join Game</button>
          </div>
        )
      }
    </div>
  )
};

export default CreateGame;
