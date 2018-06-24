import React from 'react';

import Image from './Image';

import iconRound from '../images/icon-round.svg';
import iconQuestion from '../images/icon-question.svg';
import iconSuspects from '../images/icon-suspects.svg';
import iconNo from '../images/icon-no.svg';
import iconYes from '../images/icon-yes.svg';
import iconLoading from '../images/icon-loading.svg';

import {
  RoundIcon,
  SuspectsIcon,
  QuestionIcon,
} from './Icons';

const GameWitness = ({props}) => {
  const { app } = props;

  return (
    <div className="container container-center container-witness">
      <header className="header">
        <div className="round-count">
          <img className="icon" src={iconRound} alt="Round" /> { app.round }
        </div>
        <img className="icon" src={iconQuestion} alt="Question" />
        <div className="suspects-count">
        <img className="icon" src={iconSuspects} alt="Suspects" /> { app.suspectsLeft }
        </div>
      </header>
      <div className="question">
        {
          app.turn === 'detective' ? (
            <h2>Waiting for Detective...</h2>
          ) : (
            <h2>Question goes here</h2>
          )
        }
      </div>
      <div className="picture">
        <Image name={app.solution} />
      </div>
      <footer className="footer">
      {
          app.turn === 'detective' ? (
            <img className="icon-answer" src={iconLoading} alt="Waiting..." />
          ) : (
            <div className="icon-answer-group">
              <img className="icon-answer" src={iconNo} alt="No" />
              <img className="icon-answer" src={iconYes} alt="Yes" />
            </div>
          )
        }
      </footer>
    </div>
  )
}

export default GameWitness;
