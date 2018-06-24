import React from 'react';

import Image from './Image';
import WaitingPlayers from './WaitingPlayers';

import iconRound from '../images/icon-round.svg';
import iconQuestion from '../images/icon-question.svg';
import iconSuspects from '../images/icon-suspects.svg';
import iconNo from '../images/icon-no.svg';
import iconYes from '../images/icon-yes.svg';
import iconOk from '../images/icon-ok.svg';
import iconLoading from '../images/icon-loading.svg';

const GameDetective = ({props}) => {
  const { app } = props;

  if (app.turn === 'none') {
    return <WaitingPlayers props={props} />
  }

  return (
    <div className="container container-center container-detective">
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
          app.turn !== 'detective' ? (
            <h2>Waiting for Witness...</h2>
          ) : (
            <h2>
              Long ass question goes here and it's so long that it might not even fit in this tiny box.
              {
                app.currentAnswer === true ?
                  <img className="icon-answer" src={iconYes} alt="Yes" />
                  :
                  <img className="icon-answer" src={iconNo} alt="No" />
              }
            </h2>
          )
        }
      </div>
      <div className="suspects-grid">
        {
          app.suspects.map((suspect, index) => {
            const key = `${suspect}-${index}`;

            if (app.eliminatedSuspects[suspect] === undefined) {
              return (
                <div key={key} className="suspect">
                  <span className="number">{ index + 1 }</span>
                  <Image name={suspect} />
                </div>
              )
            }

            return (
              <div key={key} className="suspect">
                <Image name="back" />
              </div>
            )
          })
        }
      </div>
      <footer className="footer">
        {
          app.turn !== 'detective' ? (
            <img className="icon-answer" src={iconLoading} alt="Waiting..." />
          ) : (
            <img className="icon-answer" src={iconOk} alt="Ok" />
          )
        }
      </footer>
    </div>
  )
}

export default GameDetective;

