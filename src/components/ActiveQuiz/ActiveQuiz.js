import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList.js'
const ActiveQuiz = props => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{props.answerNumber}.</strong>&nbsp;
          {props.question}
        </span>
        <small>{props.answerNumber} of {props.quizLength}</small>
      </p>
      <AnswersList
        answers={props.answers}
        answerState={props.answerState}
      >
      </AnswersList>
    </div>
  )
}
export default ActiveQuiz