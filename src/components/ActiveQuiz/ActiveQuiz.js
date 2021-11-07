import React, { Component } from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList.js'
// import { delay } from '../../pure/pure'

class ActiveQuiz extends Component {
  render(){
    return (
      <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
          <span>
            <strong>{this.props.answerNumber}.</strong>&nbsp;
            {this.props.question}
          </span>
          <small>{this.props.answerNumber} of {this.props.quizLength}</small>
        </p>
        <AnswersList
          answers={this.props.answers}
          answerState={this.props.answerState}
        >
        </AnswersList>
        <progress className={classes['progress-bar']}max={this.props.timeChange} value={this.props.rangePercent} id="prog"></progress>
      </div>
    )
  }
}
// const ActiveQuiz = props => {
// }
export default ActiveQuiz