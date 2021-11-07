import React from 'react'
import classes from './FinishedQuiz.module.css'
import { Button } from '../UI/Button/Button'

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === true) {
      total++
    }
    return total
  }, 0)
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
        <Button
          onButtonHandler={()=> console.log('Move to Tests List')}
          type={'success'}
        >
          Tests List
        </Button>
      </div>
    </div>
  )
}
export default FinishedQuiz