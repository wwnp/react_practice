import React from "react";
import classes from './AnswersItem.module.css'
import { ClickedContext } from "../../../../containers/quiz/Quiz.js";
const AnswerItem = props => {
  return (
    <ClickedContext.Consumer>
      {(context)=> {
        return (
          <li 
            className={classes.AnswerItem}
            onClick={context}
            // onClick={props.onAnswerClick}
            data-id={props.id}
          >
            {props.answer.text}
          </li>
        )
      }}
    </ClickedContext.Consumer>

  )
}
export default AnswerItem