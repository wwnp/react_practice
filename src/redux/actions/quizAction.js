import axios from 'axios'
import { delay } from '../../pure/pure'
import { START_LOADING, FETCH_QUIZ_SUCCESS,ERROR } from './actionTypes'
export function fetchQuiz(param) {
  return async dispatch => {
    dispatch({ type: START_LOADING })
    try {
      const hashQuiz = param.hash
      const response = await axios.get(`https://react-quiz-ce9f7-default-rtdb.europe-west1.firebasedatabase.app/quizes/${hashQuiz}.json`)
      const { data } = response
      const quiz = data

      dispatch({ type: FETCH_QUIZ_SUCCESS, quiz:quiz})
    } catch (error) {
      dispatch({ type: ERROR })
    }
  }
}
function fetchQuizStart() {
  return {
    type: START_LOADING
  }
}
function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}