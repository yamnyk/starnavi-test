const SET_GRID = 'SET_GRID';
const SET_MODES = 'SET_MODES';
const SET_ACTIVE_MODE = 'SET_ACTIVE_MODE';
const SET_PLAYER = 'SET_PLAYER';
const SET_WINNER = 'SET_WINNER';

export const initialState = {
  grid: null,
  modes: null,
  activeMode: null,
  player: null,
  winner: null
};

export const reducer = (state, {type, payload}) => {
  switch (type) {
    case SET_GRID:
      return {
        ...state,
        grid: payload
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
    default:
      console.error(`Wrong action - ${type}`);
      return state;
  }
};

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
