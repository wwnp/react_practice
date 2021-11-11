import React from "react";
import classes from './AnswersItem.module.css'
import { AnswerClickHandlerContext } from "../../../../containers/Quiz/Quiz.js";

const AnswerItem = props => {
  return (
    <AnswerClickHandlerContext.Consumer>
      {onAnswerClickHandler => {
        const commonClasses = [classes.AnswerItem]
        if(props.answerState){
          commonClasses.push(classes[props.answerState])
        }
        return (
          <li
            className={ commonClasses.join(' ') }
            onClick={onAnswerClickHandler.bind(this, props.answer.id)}
          >
            {props.answer.text}
          </li>
        )
      }}
    </AnswerClickHandlerContext.Consumer>
  )
}
export default AnswerItem
