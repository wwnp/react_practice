import { START_LOADING,FETCH_QUIZES_ERROR, FETCH_QUIZES_SUCCESS } from "../actions/actionTypes"

const initialState = {
  payload: [],
  loading: false
}
export function quizListReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true }
    case FETCH_QUIZES_SUCCESS:
      return { ...state, loading: false, payload: action.quizes }
    case FETCH_QUIZES_ERROR:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}
