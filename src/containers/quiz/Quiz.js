import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
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
          answers: [{ text: 'answer 1', id: 1 }, { text: 'answer 2', id: 2 }, { text: 'answer 3', id: 3 }, { text: 'answer 4', id: 4 }],
          rightAnswerId: 1
        },
        {
          question: 'What is your name?',
          answers: [{ text: 'answer 1', id: 1 }, { text: 'answer 2', id: 2 }, { text: 'answer 3', id: 3 }, { text: 'answer 4', id: 4 }],
          rightAnswerId: 2
        },
        {
          question: 'How old are you?',
          answers: [{ text: 'answer 1', id: 1 }, { text: 'answer 2', id: 2 }, { text: 'answer 3', id: 3 }, { text: 'answer 4', id: 4 }],
          rightAnswerId: 3
        },
      ],
    counter: 0

  }
  onAnswerClickHandler = (answerId, event) => {
    const question = this.state.quiz[this.state.activeQuestion]
    if (question.rightAnswerId === answerId) {
      this.setState({
        answerState: { [answerId]: 'success' }
      })
      this.setState(prevState => {
        return {
          counter: prevState.counter + 1
        }
      })
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          // pass
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearInterval(timeout)
      }, 800)

    } else {
      this.setState({
        answerState: { [answerId]: 'fail' }
      })
    }
  }
  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz</h1>
          <AnswerClickHandlerContext.Provider
            value={this.onAnswerClickHandler}
          >
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion}
              answerState={this.state.answerState}
            >
            </ActiveQuiz>
          </AnswerClickHandlerContext.Provider>
          <span>{Math.random(0, 1)}</span>
        </div>
      </div>
    )
  }
}
export default Quiz