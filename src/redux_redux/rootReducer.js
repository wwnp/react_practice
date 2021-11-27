import { quizReducer } from "./reducers/quizReducer";
import { combineReducers } from 'redux'
export default combineReducers({
  quiz: quizReducer
}
)