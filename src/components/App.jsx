/* eslint react/prefer-stateless-function: 0 */

import React, { Component } from 'react';


import { LoadingIcon } from './Icons';

import CreateGame from './CreateGame';
import Game from './Game';
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

    /* JOIN GAME SCREEN
     * User inputs game id
     */
    if (app.screen === 'game') {
      return <Game props={ this.props } />
    }

    return (
      <div className="container">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <LoadingIcon />
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
