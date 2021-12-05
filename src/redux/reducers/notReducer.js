import { SHOW_NOT, HIDE_NOT } from "../actions/actionTypes"

const initialState = {
  show: false,
  valueNot: null,
  typeNot: 'default'
}
export function notReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_NOT:
      return { ...state, show: true, valueNot: action.valueNot, typeNot: action.typeNot === undefined ? initialState.typeNot : action.typeNot }
    case HIDE_NOT:
      return initialState
    default:
      return state
  }
}