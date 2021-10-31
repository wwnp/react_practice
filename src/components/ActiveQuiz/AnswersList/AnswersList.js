import React from 'react'
import AnswerItem from './AnswersItem/AnswersItem'
import classes from './AnswersList.module.css'
const AnswersList = props => {
  return (
    <ul className={classes.AnswersList}>
      {props.answers.map((answer, index) => {
        return (
          <AnswerItem 
            key={index} 
            id={index+1}
            answer={answer} 
            // onAnswerClick={props.onAnswerClick}
          >
          </AnswerItem>
        )
      })}
    </ul>
  )

}
export default AnswersList