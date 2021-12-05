import { ERROR, RIGHT_ANSWER, WRONG_ANSWER, CURRENT_PROGRESS, CURRENT_PROGRESS_RESET, FINISH_TRUE, FINISH_FALSE } from "./actionTypes"
import { delay } from "../../pure/pure"
export function quizAnswerClick(answerId) {
  return async (dispatch, getState) => {
    const state = getState().quiz
    if (state.quiz.answerState) {
      const key = Object.keys(state.quiz.answerState)[0]
      if (state.quiz.answerState[key] === 'success') {
        return
      }
    }
    const question = state.quiz[state.activeQuestion]
    let temp = state.results
    
    if (question.rightAnswer === answerId) {
      temp[state.activeQuestion] = true
      dispatch({
        type: RIGHT_ANSWER,
        answerState: { [answerId]: 'success' },
        counter: state.counter + 1,
        results: { ...temp }
      })
    } else {
      temp = state.results
      temp[state.activeQuestion] = false
      dispatch({
        type: WRONG_ANSWER,
        answerState: { [answerId]: 'fail' },
        results: { ...temp }
      })
    }
    await delay(600)
    
    if (isQuizFinished(state)) {
      dispatch({
        type: FINISH_TRUE,
        isFinished: true,
      })
    } else {
      const activeQuestion = state.activeQuestion
      dispatch({
        type: FINISH_FALSE,
        activeQuestion: state.activeQuestion + 1,
        answerState: null,
      })
    }
    // let currentProgressNew = state.currentProgress
    // const interval = window.setInterval(() => {
    //   currentProgressNew = currentProgressNew + 1
    //   dispatch({
    //     type: CURRENT_PROGRESS,
    //     currentProgress: currentProgressNew
    //   })
    //   if (currentProgressNew === state.maxProgress) {
    //     dispatch({
    //       type: CURRENT_PROGRESS_RESET,
    //       currentProgress: state.initialProgress
    //     })
    //     clearInterval(interval)
    //     // document.removeEventListener("click", handlerStopEvent, true);
    //     if (isQuizFinished(state)) {
    //       dispatch({
    //         type: FINISH_TRUE,
    //         isFinished: true,
    //       })
    //     } else {
    //       dispatch({
    //         type: FINISH_FALSE,
    //         activeQuestion: state.activeQuestion + 1,
    //         answerState: null,
    //       })
    //     }
    //   }
    // }, 1)
  }
}
function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length // 1 === 1
}