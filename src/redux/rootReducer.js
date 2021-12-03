import { quizListReducer } from "./reducers/quizListReducer";
import { combineReducers } from 'redux'
import { flowersReducer } from "./reducers/flowersReducer";
import { quizReducer } from "./reducers/quizReducer";
import { createReducer } from "./reducers/createQuizReducer";
import { notReducer } from "./reducers/notReducer";
import {authReducer} from "./reducers/authReducer";
export default combineReducers({
  quizList: quizListReducer,
  flowers: flowersReducer,
  quiz: quizReducer,
  create: createReducer,
  not: notReducer,
  auth: authReducer
})