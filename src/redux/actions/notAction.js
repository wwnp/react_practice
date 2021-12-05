import { delay } from "../../pure/pure"
import { SHOW_NOT, HIDE_NOT } from "./actionTypes"
export function showNot(valueNot, typeNot) {
  return async (dispatch) => {
    try {
      dispatch({ type: SHOW_NOT, valueNot, typeNot })
      await delay(1200)
      dispatch({ type: HIDE_NOT })
    } catch (error) {
      dispatch({ type: SHOW_NOT, valueNot, typeNot })
    }
  }
}