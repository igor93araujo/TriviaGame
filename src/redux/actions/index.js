import {
  ADD_EMAIL,
  ADD_NAME,
  START_GAME,
  ADD_SCORE,
  ADD_ASSERTIONS,
} from './actionTypes';

export const startGame = (payload) => ({
  type: START_GAME,
  payload,
});
export const requestError = (error) => ({
  type: GET_ERROR,
  error,
});
export const requestTokenAPI = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data.token;
};
export const fetchToken = () => async (dispatch) => {
  try {
    const data = await requestTokenAPI();
    dispatch(startGame(data));
    return data;
  } catch (error) {
    dispatch(requestError(error));
  }
};
export const addName = (payload) => ({ type: ADD_NAME, payload });
export const addEmail = (payload) => ({ type: ADD_EMAIL, payload });
export const addScore = (payload) => ({ type: ADD_SCORE, payload });
export const addAssertions = (payload) => ({ type: ADD_ASSERTIONS, payload });
