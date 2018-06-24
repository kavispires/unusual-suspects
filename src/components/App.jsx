/* eslint react/prefer-stateless-function: 0 */

import React, { Component } from 'react';

import { LoadingIcon } from './Icons';

import CreateGame from './CreateGame';
import Game from './Game';
import GameWitness from './GameWitness';
import Home from './Home';
import JoinGame from './JoinGame';
import SplashScreen from './SplashScreen';

class App extends Component {
  componentDidMount() {
    if (!this.props.app.isLoaded) {
      this.props.initFirebase();
    }
  }

  render() {
    const { app } = this.props;

    /* SPLASH SCREEN
     * Waits for Firebase to be ready
     */
    if (!app.isLoaded) {
      return <SplashScreen />
    }

    /* HOME SCREEN
     * User inputs type of game
     */
    if (!app.gameId && app.screen === 'home') {
      return <Home props={ this.props } />
    }

    /* CREATE GAME SCREEN
     * User creates new game instance
     */
    if (app.screen === 'create') {
      return <CreateGame props={ this.props } />
    }

    /* JOIN GAME SCREEN
     * User inputs game id
     */
    if (app.screen === 'join') {
      return <JoinGame props={ this.props } />
    }

    /* DETECTIVE SCREEN
     * User inputs game id
     */
    if (app.screen === 'game-detective') {
      return <Game props={ this.props } />
    }

    /* WITNESS SCREEN
     * User inputs game id
     */
    if (app.screen === 'game-witness') {
      return <GameWitness props={ this.props } />
    }

    return (
      <div className="container">
        <h1>Error</h1>
      </div>
    );
  }
}

export default App;
