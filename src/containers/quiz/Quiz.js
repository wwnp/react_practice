import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz.js'
import { delay, handler } from '../../pure/pure'
import { useParams } from "react-router-dom";
import Progress from '../../components/UI/Progress/Progress'

export const AnswerClickHandlerContext = React.createContext(false)
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
    isFinished: false,
    results: {},
    initialProgress: 0,
    maxProgress: 100,
    currentProgress: 0
  }

  onAnswerClickHandler = (answerId, event) => {
    console.log(this.progress)
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    document.addEventListener("click", handler, true);
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
    let currentProgressMutant = this.state.currentProgress
    const interval = window.setInterval(() => {
      currentProgressMutant = currentProgressMutant + 1
      this.setState({
        currentProgress: currentProgressMutant
      })
      if (currentProgressMutant === this.state.maxProgress) {
        this.setState({
          currentProgress: this.state.initialProgress
        })
        clearInterval(interval)
        document.removeEventListener("click", handler, true);
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          })
        }
      }
    }, 1)

    // delay(500).then(()=> {
    //   document.removeEventListener("click",handler,true);
    //     if (this.isQuizFinished()) {
    //       this.setState({
    //         isFinished: true,
    //         rangePercent: 0
    //       })
    //     } else {
    //       this.setState({
    //         activeQuestion: this.state.activeQuestion + 1,
    //         answerState: null,
    //         rangePercent: 0
    //       })
    //     }
    // })
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  onButtonHandler() {
    this.setState({
      isFinished: false,
      counter: 0,
      initialProgress: 0,
      activeQuestion: 0,
      answerState: null,
      results: {}
    })
  }

  render() {
    console.log(this.props)
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
              >
                <Progress
                  maxProgress={this.state.maxProgress}
                  value={this.state.currentProgress}
                >
                </Progress>
              </ActiveQuiz>

            </AnswerClickHandlerContext.Provider>
          </div>
        }

      </div>
    )
  }
  async componentDidMount() {
    try {

    } catch (error) {

    }

  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
  const params = useParams();
  return <Quiz {...props} param={params} />;
}
// export default Quiz
