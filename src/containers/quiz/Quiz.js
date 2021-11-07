import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz.js'
import { handler } from '../../pure/pure'
export const AnswerClickHandlerContext = React.createContext(false)
export const AnswerStateContext = React.createContext(false)

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null,
    quiz:
      [
        {
          question: 'How are you?',
          answers: [{ text: 'answer 1', id: 0 }, { text: 'answer 2', id: 1 }, { text: 'answer 3', id: 2 }, { text: 'answer 4', id: 3 }],
          rightAnswerId: 0
        },
        {
          question: 'What is your name?',
          answers: [{ text: 'answer 1', id: 0 }, { text: 'answer 2', id: 1 }, { text: 'answer 3', id: 2 }, { text: 'answer 4', id: 3 }],
          rightAnswerId: 1
        },
        {
          question: 'How old are you?',
          answers: [{ text: 'answer 1', id: 0 }, { text: 'answer 2', id: 1 }, { text: 'answer 3', id: 2 }, { text: 'answer 4', id: 3 }],
          rightAnswerId: 2
        },
      ],
    counter: 0,
    rangePercent: 0,
    isFinished: false,
    results: { },
    timeChange: 1500
  }

  onAnswerClickHandler = (answerId, event) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    document.addEventListener("click",handler,true);
    const temp = this.state.results

    if (question.rightAnswerId === answerId) {
      
      temp[this.state.activeQuestion] = true
      this.setState({
        answerState: { [answerId]: 'success' },
        counter: this.state.counter + 1,
        results: { ...temp }
      })
    } else {
      const temp = this.state.results
      temp[this.state.activeQuestion] = false
      this.setState({
        answerState: { [answerId]: 'fail' },
        results: { ...temp }
      })
    }

    const interval = window.setInterval(() => {
      this.setState({
        rangePercent: this.state.rangePercent + 1
      })
      if (this.state.rangePercent >= this.state.timeChange) {
        document.removeEventListener("click",handler,true);
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
            rangePercent: 0
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
            rangePercent: 0
          })
        }
        window.clearInterval(interval)
      }
    }, 1);
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  onButtonHandler() {
    this.setState({
      isFinished: false,
      counter: 0,
      rangePercent: 0,
      activeQuestion: 0,
      answerState: null,
      results: {}
    })
  }

  render() {
    return (
      <div className={classes.Quiz}>
        {this.state.isFinished
          ? <FinishedQuiz
            counter={this.state.counter}
            results={this.state.results}
            quiz={this.state.quiz}
            onButtonHandler={this.onButtonHandler.bind(this)}
          >
          </FinishedQuiz>
          : <div className={classes.QuizWrapper} >
            <h1>Quiz</h1>
            <AnswerClickHandlerContext.Provider
              value={this.onAnswerClickHandler}
            >
              <ActiveQuiz
                state={this.state}
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion}
                answerState={this.state.answerState}
                rangePercent={this.state.rangePercent}
                timeChange={this.state.timeChange}
              >
              </ActiveQuiz>
            </AnswerClickHandlerContext.Provider>
          </div>
        }

      </div>
    )
  }
  componentDidMount() {
    this.progress = document.getElementById('prog')
  }
}
export default Quiz