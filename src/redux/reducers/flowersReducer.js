import { START_LOADING,FETCH_FLOWERS_SUCCESS,FETCH_FLOWERS_ERROR } from '../actions/actionTypes'
const initialState = {
  loading: false,
  flowers: []
}
export function flowersReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true }
    case FETCH_FLOWERS_SUCCESS:
      return { ...state, loading: false, flowers: action.flowers }
    case FETCH_FLOWERS_ERROR:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}