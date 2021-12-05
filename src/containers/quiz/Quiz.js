import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz.js'
import { handlerStopEvent } from '../../pure/pure'
import { useParams, useNavigate } from "react-router-dom";
import Progress from '../../components/UI/Progress/Progress'
import { Container, Row, Col } from 'react-bootstrap';
import Loader from '../../components/UI/Loader/Loader.js'
import { connect } from 'react-redux'
import { fetchQuiz } from '../../redux/actions/quizAction'
import { bindActionCreators } from 'redux'
import { quizAnswerClick } from '../../redux/actions/quizAnswerClickAction'
import { resetButton } from '../../redux/actions/resetButtonAction'
import { testsButton } from '../../redux/actions/buttonTestsAction'
export const AnswerClickHandlerContext = React.createContext(false)
class Quiz extends Component {
  render() {
    return (
      <div className={classes.Quiz}>
        <Container>
          <Row className='justify-content-center'>
            <Col md='8' lg='8'>
              {this.props.quiz.isFinished
                ?
                <FinishedQuiz
                  counter={this.props.quiz.counter}
                  results={this.props.quiz.results}
                  quiz={this.props.quiz.quiz}
                  onButtonHandler={() => this.props.resetButton()}
                  onButtonTests={() => this.props.testsButton(this.props.navigate)}
                >
                </FinishedQuiz>
                :
                <div className={classes.QuizWrapper} >
                  <h1>Quiz</h1>
                  <AnswerClickHandlerContext.Provider value={this.props.quizAnswerClick} >
                    {this.props.quiz.quiz === null
                      ?
                      <Loader color="blue"></Loader>
                      :
                      <ActiveQuiz
                        state={this.props.quiz}
                        answers={this.props.quiz.quiz[this.props.quiz.activeQuestion].answers}
                        question={this.props.quiz.quiz[this.props.quiz.activeQuestion].question}
                        quizLength={this.props.quiz.quiz.length}
                        answerNumber={this.props.quiz.activeQuestion}
                        answerState={this.props.quiz.answerState}
                      >
                        <Progress maxProgress={this.props.quiz.maxProgress} value={this.props.quiz.currentProgress} >
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
  componentDidMount() {
    this.props.fetchQuiz(this.props.param)
  }
  componentWillUnmount(){
    this.props.resetButton()
  }
}
function mapStateToProps(state) {
  return {
    test: state,
    quiz: state.quiz,
    loading: state.quiz.loading
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuiz: bindActionCreators(fetchQuiz, dispatch),
    quizAnswerClick: bindActionCreators(quizAnswerClick, dispatch),
    resetButton: () => dispatch(resetButton()),
    testsButton: bindActionCreators(testsButton, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)((props) => {
  const param = useParams()
  const navigate = useNavigate()
  return <Quiz {...props} param={param} navigate={navigate}/>
})
