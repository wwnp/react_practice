import { LOGIN_ANSWER, AUTH_SUCCESS, AUTO_LOGOUT } from "../actions/actionTypes"
const initialState = {
  token: null,
  responseAnswer: null
}
export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ANSWER:
      return { ...state, responseAnswer: action.responseAnswer }
    case AUTH_SUCCESS:
      return { ...state, token: action.token }
    case AUTO_LOGOUT:
      return { ...state, token: null }
    default:
      return state
  }
}