import { BTN_TESTS } from './actionTypes'
export function testsButton(navigate) {
  return (dispatch) => {
    dispatch({ type: BTN_TESTS })
    navigate('/')
  }
}
