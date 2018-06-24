import React from 'react';

import Image from './Image';
import WaitingPlayers from './WaitingPlayers';

import iconRound from '../images/icon-round.svg';
import iconQuestion from '../images/icon-question.svg';
import iconSuspects from '../images/icon-suspects.svg';
import iconNo from '../images/icon-no.svg';
import iconYes from '../images/icon-yes.svg';
import iconLoading from '../images/icon-loading.svg';

const GameWitness = ({props}) => {
  const { app } = props;

  if (app.turn === 'none') {
    return <WaitingPlayers props={props} />
  }

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
      <div className="question">
        {
          app.turn !== 'witness' ? (
            <h2>Waiting for Detective...</h2>
          ) : (
            <h2>{ app.currentQuestion && app.currentQuestion[app.language] }</h2>
          )
        }
      </div>
      <div className="picture">
        <Image name={app.solution} />
      </div>
      <footer className="footer">
      {
          app.turn !== 'witness' ? (
            <img className="icon-answer" src={iconLoading} alt="Waiting..." />
          ) : (
            <div className="icon-answer-group">
              <img
                className="icon-answer"
                src={iconNo}
                alt="No"
                onClick={() => props.answerQuestion(false)}
              />
              <img
                className="icon-answer"
                src={iconYes}
                alt="Yes"
                onClick={() => props.answerQuestion(true)}
              />
            </div>
          )
        }
      </footer>
    </div>
  )
}

export default GameWitness;
