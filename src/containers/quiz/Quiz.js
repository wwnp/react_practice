import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
export const ClickedContext = React.createContext(false)
class Quiz extends Component {
  state = {
    quiz:
      [
        {
          question: 'How are you?',
          answers: [{ text: 'answer 1', id: 1 }, { text: 'answer 2', id: 2 }, { text: 'answer 3', id:3 }, { text: 'answer 4', id: 4 }],
          rightAnswerId: 2 
        }
      ]
  }
  onAnswerClickHandler = (answerId,event)=> {
    console.log('onAnswerClickHandler')
    if(parseInt(event.target.dataset.id) === answerId){
      console.log('good')
    }
  }
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz</h1>
          <ClickedContext.Provider
            value={this.onAnswerClickHandler.bind(this,this.state.quiz[0].rightAnswerId)}
          > 
            <ActiveQuiz
              answers={this.state.quiz[0].answers}
              question={this.state.quiz[0].question}
              // onAnswerClick={this.onAnswerClickHandler.bind(this,this.state.quiz[0].rightAnswerId)}
            >
              
            </ActiveQuiz>
          </ClickedContext.Provider>
        </div>
      </div>
    )
  }
}
export default Quiz