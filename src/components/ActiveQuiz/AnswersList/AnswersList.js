import React from 'react'
import AnswerItem from './AnswersItem/AnswersItem'
import classes from './AnswersList.module.css'
const AnswersList = props => {
  console.log(props)
  return (
    <ul className={classes.AnswersList}>
      {props.answers.map((answer, index) => {
        return (
          <AnswerItem 
            key={index} 
            answer={answer} 
          >
          </AnswerItem>
        )
      })}
    </ul>
  )

}
// const AnswersList = props => (
//   <ul className={classes.AnswersList}>
//     {props.answers.map((answer, index) => {
//       return (
//         <AnswerItem key={index} answer={answer} id={index}></AnswerItem>
//       )
//     })}
//   </ul>
// )
export default AnswersList