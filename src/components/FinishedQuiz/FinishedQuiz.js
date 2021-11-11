import React from 'react'
import classes from './FinishedQuiz.module.css'
import { Button } from '../UI/Button/Button'
import {  useNavigate, Link } from "react-router-dom";

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === true) {
      total++
    }
    return total
  }, 0)

  const navigate = useNavigate()
  const toQuizListHandler = (e) => {
    e.preventDefault()
    navigate("/")
  }
  return (
    <div className={classes.FinishedQuiz}>
      <h1>Finished</h1>
      <ul>
        {props.quiz.map((el, index) => {
          return (
            <li
              key={index}
            >
              <strong>{index + 1}.</strong>&nbsp;
              <span>{el.question}</span>
              {props.results[index]
                ? <i className={'fa fa-check ' + classes.success}></i>
                : <i className={'fa fa-times ' + classes.error}></i>
              }
            </li>
          )
        })}
      </ul>
      <h2>Your score: {props.counter}</h2>
      <h4>Right: {successCount} of {props.quiz.length}</h4>
      <div>
        <Button
          onButtonHandler={props.onButtonHandler}
          type={'primary'}
        >
          Again?
        </Button>
        <Link to='/'>
          <Button
            // onButtonHandler={toQuizListHandler} or Link
            type={'success'}
          >
            Tests List
          </Button>
        </Link>
      </div>
    </div>
  )
}
export default FinishedQuiz
