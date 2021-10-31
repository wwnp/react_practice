import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList.js'
const ActiveQuiz = props => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>2.</strong>&nbsp;
        How are you?
      </span>
      <small>4 of 12</small>
    </p>
    <AnswersList answers={props.answers}></AnswersList>
  </div>
)

export default ActiveQuiz