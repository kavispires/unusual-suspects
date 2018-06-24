import { connect } from "react-redux";

import App from "../components/App";

import {
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
