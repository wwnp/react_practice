import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz.js'
import { delay, handlerStopEvent } from '../../pure/pure'
import { useParams } from "react-router-dom";
import Progress from '../../components/UI/Progress/Progress'
import { Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import Loader from '../../components/UI/Loader/Loader.js'
export const AnswerClickHandlerContext = React.createContext(false)
class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    counter: 0,
    isFinished: false,
    results: {},
    initialProgress: 0,
    maxProgress: 100,
    currentProgress: 0,
    loading: true
  }
  onAnswerClickHandler = (answerId, event) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }
    const question = this.state.quiz[this.state.activeQuestion]
    document.addEventListener("click", handlerStopEvent, true);
    const temp = this.state.results
    if (question.rightAnswer === answerId) {

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
        document.removeEventListener("click", handlerStopEvent, true);
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
    return (
      <div className={classes.Quiz}>
        <Container>
          <Row className='justify-content-center'>
            <Col md='8' lg='8'>
              {this.state.isFinished
                ?
                <FinishedQuiz
                  counter={this.state.counter}
                  results={this.state.results}
                  quiz={this.state.quiz}
                  onButtonHandler={this.onButtonHandler.bind(this)}
                >
                </FinishedQuiz>
                :
                <div className={classes.QuizWrapper} >
                  <h1>Quiz</h1>
                  <AnswerClickHandlerContext.Provider value={this.onAnswerClickHandler} >
                    {this.state.loading
                      ?
                      <Loader color="blue"></Loader>
                      :
                      <ActiveQuiz
                        state={this.state}
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion}
                        answerState={this.state.answerState}
                      >
                        <Progress maxProgress={this.state.maxProgress} value={this.state.currentProgress} >
                        </Progress>
                      </ActiveQuiz>
                    }

                  </AnswerClickHandlerContext.Provider>
                </div>
              }
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
  async componentDidMount() {
    try {
      const hashQuiz = this.props.param.hash
      const response = await axios.get(`https://react-quiz-ce9f7-default-rtdb.europe-west1.firebasedatabase.app/quizes/${hashQuiz}.json`)
      const { data } = response
      const newQuiz = data
      // Object.entries(data).forEach(item => {
      //   const val = item[1]
      //   newQuiz.push(val[0])
      // })

      await delay(700)

      this.setState({
        quiz: newQuiz,
        loading: false
      })
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
