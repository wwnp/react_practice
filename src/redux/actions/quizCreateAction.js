import { ADD_QUESTION, RESET_CREATION } from "./actionTypes";
// import { ADD_QUESTION, CREATE_QUIZ, RESET_CREATION } from "./actionTypes";
import axios from "axios";
import { showNot } from "./notAction";
import { NOTIFICATIONS } from "../../pure/pure";
export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}
export function finishQuiz(quiz) {
  return async (dispatch) => {
    try {
      await axios.post('https://react-quiz-ce9f7-default-rtdb.europe-west1.firebasedatabase.app/quizes.json', quiz)

      dispatch(resetCreation())
      dispatch(showNot(NOTIFICATIONS.successfinishQuiz.valueNot, NOTIFICATIONS.successfinishQuiz.typeNot))
    } catch (error) {
      dispatch(resetCreation())
      dispatch(showNot(NOTIFICATIONS.errorFinishQuiz.valueNot, NOTIFICATIONS.errorFinishQuiz.typeNot))
    }

  }
}
export function resetCreation() {
  return {
    type: RESET_CREATION
  }
}