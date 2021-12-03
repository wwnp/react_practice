// import { ERROR, RIGHT_ANSWER, WRONG_ANSWER, CURRENT_PROGRESS, CURRENT_PROGRESS_RESET, FINISH_TRUE, FINISH_FALSE } from "../actions/actionTypes"
// const initialState = {
//   activeQuestion: 0,
//   answerState: null,
//   quiz: [],
//   counter: 0,
//   isFinished: false,
//   results: {},
//   initialProgress: 0,
//   maxProgress: 100,
//   currentProgress: 0,
//   loading: true
// }
// export function quizAnswerReducer(state = initialState, action) {
//   switch (action.type) {
//     case RIGHT_ANSWER:
//       return {
//         ...state,
//         answerState: action.answerState,
//         counter: action.counter,
//         results: action.results,
//       }
//     case WRONG_ANSWER:
//       return {
//         ...state,
//         answerState: action.answerState,
//         results: action.results,
//       }
//     case FINISH_TRUE:
//       return {
//         ...state,
//         isFinished: action.isFinished,
//       }
//     case FINISH_FALSE:
//       return {
//         ...state,
//         activeQuestion: action.activeQuestion,
//         answerState: action.answerState,
//       }
//     default:
//       return state
//   }
// }