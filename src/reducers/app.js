import { base } from "../firebase";

import { gameSetup, generateGameId } from "../utils";

/* ------------------   FIREBASE   ----------------- */

let dbRef = null;
let DB = null;
let gameRef = null;
let gameDB = null;

/* ------------------   ACTIONS   ------------------ */

const SET_CURRENT_ANSWER = "SET_CURRENT_ANSWER";
const SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION";
const SET_ELIMINATED_SUSPECTS = "SET_ELIMINATED_SUSPECTS";
const SET_GAME_ID = "SET_GAME_ID";
const SET_GAME_OVER = "SET_GAME_OVER";
const SET_IS_GAME_ID_VALID = "SET_IS_GAME_ID_VALID";
const SET_IS_LOADED = "SET_ISLOADED";
const SET_PLAYER_TYPE = "SET_PLAYER_TYPE";
const SET_ROUND = "SET_ROUND";
const SET_SCREEN = "SET_SCREEN";
const SET_SELECTED_SUSPECTS = "SET_SELECTED_SUSPECTS";
const SET_SOLUTION = "SET_SOLUTION";
const SET_SUSPECTS = "SET_SUSPECTS";
const SET_SUSPECTS_LEFT = "SET_SUSPECTS_LEFT";
const SET_TURN = "SET_TURN";
const SET_USED_QUESTIONS = "SET_USED_QUESTIONS";

/* --------------   ACTION CREATORS   -------------- */

export const setCurrentAnswer = payload => dispatch =>
  dispatch({ type: SET_CURRENT_ANSWER, payload });
export const setCurrentQuestion = payload => dispatch =>
  dispatch({ type: SET_CURRENT_QUESTION, payload });
export const setEliminatedSuspects = payload => dispatch =>
  dispatch({ type: SET_ELIMINATED_SUSPECTS, payload });
export const setGameId = payload => dispatch =>
  dispatch({ type: SET_GAME_ID, payload });
export const setGameOver = payload => dispatch =>
  dispatch({ type: SET_GAME_OVER, payload });
export const setIsGameIdValid = payload => dispatch =>
  dispatch({ type: SET_IS_GAME_ID_VALID, payload });
export const setIsLoaded = payload => dispatch =>
  dispatch({ type: SET_IS_LOADED, payload });
export const setPlayerType = payload => dispatch =>
  dispatch({ type: SET_PLAYER_TYPE, payload });
export const setRound = payload => dispatch =>
  dispatch({ type: SET_ROUND, payload });
export const setScreen = payload => dispatch =>
  dispatch({ type: SET_SCREEN, payload });
export const setSelectedSuspects = payload => dispatch =>
  dispatch({ type: SET_SELECTED_SUSPECTS, payload });
export const setSolution = payload => dispatch =>
  dispatch({ type: SET_SOLUTION, payload });
export const setSuspects = payload => dispatch =>
  dispatch({ type: SET_SUSPECTS, payload });
export const setSuspectsLeft = payload => dispatch =>
  dispatch({ type: SET_SUSPECTS_LEFT, payload });
export const setTurn = payload => dispatch =>
  dispatch({ type: SET_TURN, payload });
export const setUsedQuestions = payload => dispatch =>
  dispatch({ type: SET_USED_QUESTIONS, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  currentAnswer: {},
  currentQuestion: {},
  eliminatedSuspects: {},
  gameId: "",
  gameOver: false,
  isGameIdValid: false,
  isLoaded: false,
  playerType: "",
  round: 0,
  screen: "home",
  selectedSuspects: [],
  solution: "",
  suspects: [],
  suspectsLeft: 0,
  turn: "witness",
  usedQuestions: {}
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_CURRENT_ANSWER:
      newState.currentAnswer = action.payload;
      break;

    case SET_CURRENT_QUESTION:
      newState.currentQuestion = action.payload;
      break;

    case SET_ELIMINATED_SUSPECTS:
      newState.eliminatedSuspects = action.payload;
      break;

    case SET_GAME_ID:
      newState.gameId = action.payload;
      break;

    case SET_GAME_OVER:
      newState.gameOver = action.payload;
      break;

    case SET_IS_GAME_ID_VALID:
      newState.isGameIdValid = action.payload;
      break;

    case SET_IS_LOADED:
      newState.isLoaded = action.payload;
      break;

    case SET_PLAYER_TYPE:
      newState.playerType = action.payload;
      break;

    case SET_ROUND:
      newState.round = action.payload;
      break;

    case SET_SCREEN:
      newState.screen = action.payload;
      break;

    case SET_SELECTED_SUSPECTS:
      newState.selectedSuspects = action.payload;
      break;

    case SET_SOLUTION:
      newState.solution = action.payload;
      break;

    case SET_SUSPECTS_LEFT:
      newState.suspectsLeft = action.payload;
      break;

    case SET_SUSPECTS:
      newState.suspects = action.payload;
      break;

    case SET_TURN:
      newState.turn = action.payload;
      break;

    case SET_USED_QUESTIONS:
      newState.usedQuestions = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const initFirebase = () => dispatch => {
  dbRef = base.database().ref("games");
  const time = Date.now();

  dbRef.on("value", snap => {
    DB = snap.val();
    dispatch(setIsLoaded(true));
    console.info(`Firebase successfully loaded in ${Date.now() - time} ms`);
    console.log(DB);
  });
};

export const initGame = () => async dispatch => {
  dispatch(updateScreen("create"));
  // Create unique game id
  let gameId = generateGameId();

  while (DB[gameId] !== undefined) {
    gameId = generateGameId();
  }

  const newGame = {};
  const setup = gameSetup();

  newGame[gameId] = {
    gameId,
    timestamp: Date.now(),
    solution: setup.solution,
    suspects: setup.suspects,
    witness: false,
    detective: false
  };
  console.log(Date.now() - newGame[gameId].timestamp);
  const response = await dbRef.update(newGame);
  console.log(Date.now() - newGame[gameId].timestamp);

  dispatch(observeGame(gameId));
  dispatch(verifyGameId());
};

export const observeGame = gameId => dispatch => {
  // Create observer
  gameRef = base
    .database()
    .ref("games")
    .child(gameId)
    .on("value", snap => {
      gameDB = snap.val();
      console.info(`Firebase game data ${gameId} updated`);
      console.log(gameDB);
    });

  // Set gameId
  dispatch(setGameId(gameDB.gameId));
  // Set solution
  dispatch(setSolution(gameDB.solution));
  // Set suspects
  dispatch(setSuspects(gameDB.suspects));
};

export const verifyGameId = event => (dispatch, getState) => {
  let gameId;
  if (event) {
    gameId = event.target.value.toUpperCase();
  } else {
    gameId = getState().app.gameId;
  }

  // Update gameId
  dispatch(setGameId(gameId));

  // Verify if Id exists
  if (gameId.length === 4 && DB[gameId] !== undefined) {
    dispatch(setIsGameIdValid(true));
    dispatch(setGameId(gameId));
    dispatch(observeGame(gameId));
  } else {
    dispatch(setIsGameIdValid(false));
  }
};

export const updatePlayerType = event => async (dispatch, getState) => {
  const gameId = getState().app.gameId;

  let type = event.target.value;
  let notType = type === "detective" ? "detective" : "witness";

  if (gameDB[type]) {
    if (type === "detective") {
      type = "witness";
      notType = "detective";
    } else {
      type = "detective";
      notType = "witness";
    }
  }

  dispatch(setPlayerType(type));
  const updates = {};
  updates[`${gameId}/${type}`] = true;
  updates[`${gameId}/${notType}`] = true;

  const response = await dbRef.update(updates);
};

export const updateScreen = screen => dispatch => {
  dispatch(setScreen(screen));
};
