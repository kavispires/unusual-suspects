import { connect } from "react-redux";

import App from "../components/App";

import {
  answerQuestion,
  initFirebase,
  initGame,
  updatePlayerType,
  updateScreen,
  verifyGameId
} from "../reducers/app";

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = {
  answerQuestion,
  initFirebase,
  initGame,
  updatePlayerType,
  updateScreen,
  verifyGameId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
