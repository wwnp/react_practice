import { BTN_AGAIN } from './actionTypes'
export function resetButton() {
  return async (dispatch,getState) => {
    const state = getState().quiz
    dispatch({ type: BTN_AGAIN, quiz:state.quiz})
  }
}
