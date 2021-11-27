import axios from 'axios'
import { delay } from '../../pure/pure'
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR } from './actionTypes'
export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get('https://react-quiz-ce9f7-default-rtdb.europe-west1.firebasedatabase.app/quizes.json')
      const quizes = []
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test №${index + 1}`
        })
      })

      await delay(700)

      dispatch(fetchQuizesSuccess(quizes))
    } catch (error) {
      console.log(error)
      dispatch(fetchQuizesError(error))
    }
  }
}
function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}
function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}
function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error
  }
}