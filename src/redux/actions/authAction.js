import axios from "axios"
import { keyAuth, RESPONCE_SERVER } from "../../pure/pure"
import { LOGIN_ANSWER, AUTH_SUCCESS, AUTO_LOGOUT } from "./actionTypes"
export function authAction(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let loginOrSignUp
    loginOrSignUp = isLogin
      ? `signInWithPassword`
      : `signUp`
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${loginOrSignUp}?key=${keyAuth}`
    try {
      const response = await axios.post(url, authData)
      const { data } = response
      const expDate = new Date(new Date().getTime() + data.expiresIn * 1000)

      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('expDate', expDate)
      dispatch({ type: LOGIN_ANSWER, responseAnswer: isLogin ? RESPONCE_SERVER.SUCCES_LOGIN : RESPONCE_SERVER.SUCCES_SINGUP, token: data.idToken })
      dispatch(authSuccess(data.idToken))
      dispatch(autoLogOut(data.expiresIn))
    } catch (error) {
      dispatch({ type: LOGIN_ANSWER, responseAnswer: isLogin ? RESPONCE_SERVER.ERROR_LOGIN : RESPONCE_SERVER.ERROR_SINGUP })
    }
  }
}
export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}
export function autoLogOut(expiresIn) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expiresIn * 1000);
  }
}
export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expDate')
  return {
    type: AUTO_LOGOUT
  }
}
export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expDate = new Date(localStorage.getItem('expDate'))
      if (expDate < new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogOut((expDate.getTime() - new Date().getTime()) / 1000))
      }
    }

  }
}