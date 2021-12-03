import { ADD_QUESTION, RESET_CREATION } from "../actions/actionTypes";
const initialState = {
  quiz: []
}
export function createReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.question]
      }
    case RESET_CREATION:
      return {
        ...initialState
      }
    default:
      return state
  }
}