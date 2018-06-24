import React from 'react';

import Image from './Image';

const GameEnd = ({props}) => {
  const { app } = props;

  const score = 10;

  const result = app.turn === 'win' ? 'You win!' : 'You lose...'

  return (
    <div className="container container-center container-game-over">
      <h1>{ result }</h1>
      <ul>
        <li>Rounds: { app.round}</li>
        <li>Score: { app.score}</li>
      </ul>
      <h3>The result was...</h3>
      <div className="picture">
        <Image name={app.solution} />
      </div>
    </div>
  )
}

export default GameEnd;
