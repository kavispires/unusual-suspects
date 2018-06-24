import { connect } from "react-redux";

import App from "../components/App";

import {
  answerQuestion,
  confirmVotes,
  initFirebase,
  initGame,
  selectSuspect,
  updateLanguage,
  updatePlayerType,
  updateScreen,
  verifyGameId
} from "../reducers/app";

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = {
  answerQuestion,
  confirmVotes,
  initFirebase,
  initGame,
  selectSuspect,
  updateLanguage,
  updatePlayerType,
  updateScreen,
  verifyGameId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
