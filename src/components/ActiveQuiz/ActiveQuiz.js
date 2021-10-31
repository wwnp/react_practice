import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList.js'
const ActiveQuiz = props => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>2.</strong>&nbsp;
          {props.question}
        </span>
        <small>4 of 12</small>
      </p>
      <AnswersList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      >
      </AnswersList>
    </div>
  )
}
export default ActiveQuiz