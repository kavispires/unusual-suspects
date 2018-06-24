import { base } from "../firebase";

import { gameSetup, generateGameId, getUniqueQuestion } from "../utils";

import questionsDB from "../questions";

/* ------------------   FIREBASE   ----------------- */

let dbRef = null;
let DB = null;
let gameRef = null;
let gameDB = null;
let aiRef = null;
let aiDB = null;

/* ------------------   ACTIONS   ------------------ */

const SET_CURRENT_ANSWER = "SET_CURRENT_ANSWER";
const SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION";
const SET_ELIMINATED_SUSPECTS = "SET_ELIMINATED_SUSPECTS";
const SET_GAME_ID = "SET_GAME_ID";
const SET_GAME_OVER = "SET_GAME_OVER";
const SET_IS_GAME_ID_VALID = "SET_IS_GAME_ID_VALID";
const SET_IS_LOADED = "SET_ISLOADED";
const SET_LANGUAGE = "SET_LANGUAGE";
const SET_PLAYER_TYPE = "SET_PLAYER_TYPE";
const SET_PLAYER_TYPE_OPTIONS = "SET_PLAYER_TYPE_OPTIONS";
const SET_ROUND = "SET_ROUND";
const SET_SCORE = "SET_SCORE";
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
export const setLanguage = payload => dispatch =>
  dispatch({ type: SET_LANGUAGE, payload });
export const setPlayerType = payload => dispatch =>
  dispatch({ type: SET_PLAYER_TYPE, payload });
export const setPlayerTypeOptions = payload => dispatch =>
  dispatch({ type: SET_PLAYER_TYPE_OPTIONS, payload });
export const setRound = payload => dispatch =>
  dispatch({ type: SET_ROUND, payload });
export const setScore = payload => dispatch =>
  dispatch({ type: SET_SCORE, payload });
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
  language: "en",
  playerType: "",
  playerTypeOptions: 2,
  round: 0,
  screen: "home",
  selectedSuspects: [],
  score: 0,
  solution: "",
  suspects: [],
  suspectsLeft: 0,
  turn: "none",
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

    case SET_LANGUAGE:
      newState.language = action.payload;
      break;

    case SET_PLAYER_TYPE:
      newState.playerType = action.payload;
      break;

    case SET_PLAYER_TYPE_OPTIONS:
      newState.playerTypeOptions = action.payload;
      break;

    case SET_ROUND:
      newState.round = action.payload;
      break;

    case SET_SCORE:
      newState.score = action.payload;
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
    detective: false,
    currentQuestion: { placeholder: false },
    usedQuestions: { placeholder: false },
    eliminatedSuspects: { sus0: true },
    currentAnswer: null,
    turn: "none",
    round: 0,
    score: 0
  };
  const time = Date.now();
  await dbRef.update(newGame);
  console.log(`Database updated in ${time - Date.now()} ms`);

  dispatch(observeGame(gameId));
  dispatch(verifyGameId());
};

let performOnce = false;

export const observeGame = gameId => (dispatch, getState) => {
  // Create observer
  gameRef = base
    .database()
    .ref("games")
    .child(gameId)
    .on("value", snap => {
      gameDB = snap.val();
      console.info(`Firebase game data ${gameId} updated`);
      console.log(gameDB);

      if (gameDB.turn === "none") {
        dispatch(verifyGameReady());

        if (gameDB.detective && gameDB.witness) {
          dispatch(setPlayerTypeOptions(3));
        } else if (gameDB.detective) {
          dispatch(setPlayerTypeOptions(0));
        } else if (gameDB.witness) {
          dispatch(setPlayerTypeOptions(1));
        } else {
          dispatch(setPlayerTypeOptions(2));
        }
      }

      if (gameDB.turn === "witness" && gameDB.currentQuestion) {
        dispatch(setCurrentQuestion(questionsDB[gameDB.currentQuestion]));
      }
      if (
        gameDB.round > 1 &&
        gameDB.turn === "witness" &&
        !performOnce &&
        getState().app.round < gameDB.round
      ) {
        performOnce = true;
        setTimeout(() => {
          dispatch(startRound());
          performOnce = false;
        }, 1000);
      }
      dispatch(setTurn(gameDB.turn));
      dispatch(setRound(gameDB.round));
      dispatch(setCurrentAnswer(gameDB.currentAnswer));
      dispatch(setEliminatedSuspects(gameDB.eliminatedSuspects));
      dispatch(setSuspectsLeft(gameDB.suspectsLeft));
      dispatch(setScore(gameDB.score));
    });

  // Set gameId
  dispatch(setGameId(gameDB.gameId));
  // Set suspects
  dispatch(setSuspects(gameDB.suspects));
  // Set suspectsLeft
  dispatch(setSuspectsLeft(gameDB.suspects.length));
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

// Flag to check if user switched type options
let isASwitch = false;

export const updatePlayerType = event => async (dispatch, getState) => {
  console.log("IS A SWITCH?", isASwitch);
  const gameId = getState().app.gameId;

  let type = event.target.value;
  let notType = type === "detective" ? "detective" : "witness";

  dispatch(setPlayerType(type));
  const updates = {};
  updates[`${gameId}/${type}`] = true;
  if (isASwitch) {
    updates[`${gameId}/${notType}`] = false;
  }

  isASwitch = true;

  await dbRef.update(updates);

  if (type === "witness") {
    dispatch(setSolution(gameDB.solution));
  }
};

export const updateScreen = screen => dispatch => {
  dispatch(setScreen(screen));
};

export const verifyGameReady = () => async (dispatch, getState) => {
  if (gameDB.detective && gameDB.witness) {
    const turnUpdate = {};
    turnUpdate[`${gameDB.gameId}/turn`] = "witness";
    turnUpdate[`${gameDB.gameId}/round`] = 1;
    await dbRef.update(turnUpdate);

    const playerType = getState().app.playerType;
    if (playerType === "witness") {
      dispatch(startRound());
    }
  }
};

// IMPORTANT Only witness access this function
export const startRound = () => async (dispatch, getState) => {
  // Check winning condition
  console.log("Verifying End Game...");
  const solution = gameDB.solution;
  const eliminatedSuspects = gameDB.eliminatedSuspects;
  const suspectsLeft = gameDB.suspectsLeft;

  // Game ends when detective eliminated the solution
  if (eliminatedSuspects[solution] !== undefined) {
    return dispatch(gameOver("lose"));
  }
  // Game ends when solution is the only suspect left
  if (suspectsLeft === 1 && eliminatedSuspects[solution] === undefined) {
    return dispatch(gameOver("win"));
  }

  // Add score
  const score =
    gameDB.score + Object.keys(eliminatedSuspects).length * (11 - gameDB.round);

  const updates = {};

  // Select random unique question
  const questionId = getUniqueQuestion(gameDB.usedQuestions);

  updates[gameDB.gameId] = {
    ...gameDB,
    currentQuestion: questionId,
    score
  };
  const time = Date.now();
  await dbRef.update(updates);
  console.info(`Update happened in ${Date.now() - time} ms`);
};

export const gameOver = result => async (dispatch, getState) => {
  const { playerType } = getState().app;

  if (playerType === "detective") {
    dispatch(setSolution(gameDB.solution));
  }

  dispatch(setScreen("end-game"));

  const score =
    gameDB.score +
    Object.keys(gameDB.eliminatedSuspects).length * (11 - gameDB.round);

  const updates = {};

  updates[gameDB.gameId] = {
    ...gameDB,
    turn: result,
    score
  };
  const time = Date.now();
  await dbRef.update(updates);
  console.info(`Update happened in ${Date.now() - time} ms`);

  if (result === "win") {
    // TO-DO If result win, save all question and answers to suspect in the database
    aiRef = await base.database().ref("ai");
    const time = Date.now();

    await aiRef.on("value", snap => {
      aiDB = snap.val();
      console.info(
        `AI database successfully loaded in ${Date.now() - time} ms`
      );
      console.log(aiDB);
    });

    const updateAi = {};

    const aiDBCopy = Object.assign({}, aiDB);

    const solutionId = gameDB.solution;
    let solutionObj = aiDBCopy[solutionId] || {};
    let eliminatedObj = {};
    Object.keys(gameDB.usedQuestions).forEach(questionId => {
      const answer = gameDB.usedQuestions[questionId];
      // Record solution's answers
      if (solutionObj[questionId] === undefined) {
        solutionObj[questionId] = [answer];
      } else {
        solutionObj[questionId].push(answer);
      }
      // Record for each other suspects' answers
      Object.keys(gameDB.eliminatedSuspects).forEach(suspectId => {
        const eliminatedInstance = aiDBCopy[suspectId] || {};

        if (eliminatedInstance[questionId] === undefined) {
          eliminatedInstance[questionId] = [!answer];
        } else {
          eliminatedInstance[questionId].push(!answer);
        }

        eliminatedObj[suspectId] = Object.assign(
          {},
          eliminatedObj[suspectId],
          eliminatedInstance
        );
      });
    });

    updateAi[gameDB.solution] = {
      ...solutionObj
    };

    Object.keys(eliminatedObj).forEach(key => {
      updateAi[key] = {
        ...eliminatedObj[key]
      };
    });

    const aiTime = Date.now();
    await aiRef.update(updateAi);
    console.info(`AI Update happened in ${Date.now() - aiTime} ms`);
  }
};

export const answerQuestion = answer => async dispatch => {
  const updates = {};

  const questionId = gameDB.currentQuestion;

  const usedQuestions = Object.assign({}, gameDB.usedQuestions);
  usedQuestions[questionId] = answer;

  updates[gameDB.gameId] = {
    ...gameDB,
    usedQuestions,
    currentAnswer: answer,
    turn: "detective"
  };

  const time = Date.now();
  await dbRef.update(updates);
  console.info(`Answer update in ${Date.now() - time} ms`);

  dispatch(setCurrentAnswer(answer));
};

export const selectSuspect = suspectId => async (dispatch, getState) => {
  const selectedSuspects = [...getState().app.selectedSuspects];
  const suspectIndex = selectedSuspects.indexOf(suspectId);

  if (suspectIndex === -1) {
    selectedSuspects.push(suspectId);
  } else {
    selectedSuspects.splice(suspectIndex, 1);
  }

  dispatch(setSelectedSuspects(selectedSuspects));
};

export const confirmVotes = () => async (dispatch, getState) => {
  const eliminatedSuspects = Object.assign(
    {},
    getState().app.eliminatedSuspects
  );

  const { selectedSuspects, suspects } = getState().app;

  selectedSuspects.forEach(suspectId => (eliminatedSuspects[suspectId] = true));

  const suspectsLeft =
    suspects.length - Object.keys(eliminatedSuspects).length + 1; // +1 due to firebase object placeholder

  // Update Round Count
  const round = gameDB.round + 1;

  const updates = {};

  updates[gameDB.gameId] = {
    ...gameDB,
    eliminatedSuspects,
    suspectsLeft,
    turn: "witness",
    round
  };

  const time = Date.now();
  await dbRef.update(updates);
  console.info(`Votes update in ${Date.now() - time} ms`);
};

export const updateLanguage = event => dispatch => {
  const { value } = event.target;
  dispatch(setLanguage(value));
};
