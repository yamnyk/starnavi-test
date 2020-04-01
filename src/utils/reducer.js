import {GAME_PLAY, GAME_STOP} from "./GameStatuses";

const TOGGLE_GAME_STATUS = 'TOGGLE_GAME_STATUS';
const SET_GRID = 'SET_GRID';
const SET_ACTIVE_CELL = 'SET_ACTIVE_CELL';
const SET_MODES = 'SET_MODES';
const SET_ACTIVE_MODE = 'SET_ACTIVE_MODE';
const SET_PLAYER = 'SET_PLAYER';
const SET_WINNER = 'SET_WINNER';
const SET_MESSAGE = 'SET_MESSAGE';
const SET_SCORE = 'SET_SCORE';
const UPDATE_GRID_AND_ACTIVE_CELL = 'UPDATE_GRID_AND_ACTIVE_CELL';

export const initialState = {
  gameStatus: GAME_STOP,
  grid: null,
  activeCell: null,
  modes: null,
  activeMode: null,
  player: null,
  winner: null,
  message: '',
};

export const reducer = (state, {type, payload}) => {
  switch (type) {
    case TOGGLE_GAME_STATUS:
      return {
        ...state,
        gameStatus: state.gameStatus === GAME_STOP ? GAME_PLAY : GAME_STOP,
        message: payload
      };
    case SET_GRID:
      return {
        ...state,
        grid: payload
      };
    case SET_ACTIVE_CELL:
      return {
        ...state,
        activeCell: payload
      };
    case SET_MODES:
      return {
        ...state,
        modes: payload
      };
    case SET_ACTIVE_MODE:
      return {
        ...state,
        activeMode: payload
      };
    case SET_PLAYER:
      return {
        ...state,
        player: payload
      };
    case SET_WINNER:
      return {
        ...state,
        winner: payload
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: payload
      };
    case UPDATE_GRID_AND_ACTIVE_CELL:
      return  {
        ...state,
        ...payload
      };
    default:
      console.error(`Wrong action - ${type}`);
      return state;
  }
};

export const toggleGameStatus = payload => ({
  type: TOGGLE_GAME_STATUS,
  payload
});

export const setActiveCell = payload => ({
  type: SET_ACTIVE_CELL,
  payload
});

export const setGrid = payload => ({
  type: SET_GRID,
  payload
});

export const setModes = payload => ({
  type: SET_MODES,
  payload
});

export const setActiveMode = payload => ({
  type: SET_ACTIVE_MODE,
  payload
});

export const setPlayer = payload => ({
  type: SET_PLAYER,
  payload
});

export const setWinner = payload => ({
  type: SET_WINNER,
  payload
});

export const setMessage = payload => ({
  type: SET_MESSAGE,
  payload
});

export const setScore = payload => ({
  type: SET_SCORE,
  payload
});

export const updateGridAndActiveCell = payload => ({
  type: UPDATE_GRID_AND_ACTIVE_CELL,
  payload
});
