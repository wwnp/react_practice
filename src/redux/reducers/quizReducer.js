import { START_LOADING, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_ERROR } from '../actions/actionTypes'
import { ERROR, RIGHT_ANSWER, WRONG_ANSWER, CURRENT_PROGRESS, CURRENT_PROGRESS_RESET, FINISH_TRUE, FINISH_FALSE } from "../actions/actionTypes"
import { BTN_AGAIN } from "../actions/actionTypes"
import { BTN_TESTS } from "../actions/actionTypes"
import { CURRENT_NEW, CURRENT_RESET } from "../actions/actionTypes"

const initialState = {
  activeQuestion: 0,
  answerState: null,
  quiz: null,
  counter: 0,
  isFinished: false,
  loading: false,
  results: {},
  initialProgress: 0,
  maxProgress: 100,
  currentProgress: 0,
}
export function quizReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
      }
    case FETCH_QUIZ_ERROR:
      return { ...state, loading: false, error: action.error }
    // quizAnswer-----------------------
    case RIGHT_ANSWER:
      return {
        ...state,
        answerState: action.answerState,
        counter: action.counter,
        results: action.results,
      }
    case WRONG_ANSWER:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      }
    case FINISH_TRUE:
      return {
        ...state,
        isFinished: action.isFinished,
      }
    case FINISH_FALSE:
      return {
        ...state,
        activeQuestion: action.activeQuestion,
        answerState: action.answerState,
      }
    // BTN_AGAIN-----------------------
    case BTN_AGAIN:
      return {
        ...initialState,
        quiz: action.quiz
      }
    case BTN_TESTS:
      return {
        ...initialState,
      }
    case CURRENT_NEW:
      return {
        ...state,
        current: action.currentNew
      }
    case CURRENT_RESET:
      return {
        ...state,
        current: action.currentNew
      }
    // currentProgress-----------------------
    default:
      return state
  }
}