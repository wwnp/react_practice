import React, { Component } from 'react'
import AnswerItem from './AnswersItem/AnswersItem'
import classes from './AnswersList.module.css'

class AnswersList extends Component {
  render() {
    return (
      <ul className={classes.AnswersList}>
        {this.props.answers.map((answer, index) => {
          return (
            <AnswerItem
              key={index}
              id={index + 1}
              answer={answer}
              answerState={this.props.answerState ? this.props.answerState[answer.id] : null}
            >
            </AnswerItem>
          )
        })}
      </ul>
    )
  }
}
// const AnswersList = props => {


// }
export default AnswersList