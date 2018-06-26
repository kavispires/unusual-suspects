import React from 'react';

import Image from './Image';

const GameEnd = ({props}) => {
  const { app } = props;

  return (
    <div className="container container-center container-game-over">
      <h1>{ app.text[app.language][app.turn] }</h1>
      <ul>
        <li>{ app.text[app.language].rounds }: { app.round}</li>
        <li>{ app.text[app.language].score }: { app.score}</li>
      </ul>
      <h3>{ app.text[app.language].guilty }.</h3>
      <div className="picture">
        <Image name={app.solution} />
      </div>
    </div>
  )
}

export default GameEnd;
