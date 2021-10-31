import React from "react";
import classes from './AnswersItem.module.css'
const AnswerItem = props => {
  console.log(props)
  return (
    <li className={classes.AnswerItem}>
      {props.answer.text}
    </li>
  )
}
export default AnswerItem