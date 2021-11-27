import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import './QuizList.scss'
// import axios from 'axios' // don't need already
import Loader from '../../components/UI/Loader/Loader';
import { delay } from '../../pure/pure';
import { Button } from '../../components/UI/Button/Button';

import { connect } from 'react-redux';
import { fetchQuizes } from '../../redux/actions/quizlistAction';
class QuizList extends Component {

  renderQuizes() {
    return this.props.quizes.map((quiz, index) => {
      return (
        <li key={quiz.id} >
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      )
    })
  }
  renderLoader() {
    return (
      <Loader></Loader>
    )
  }

  render() {
    return (
      <div className='QuizList' id='test'>
        <h1>Quiz List</h1>
        {this.props.loading ? this.renderLoader() : this.renderQuizes()}
        {/* {this.props.loading && this.props.quizes !== 0 ? this.renderLoader() : this.renderQuizes()} */}
        <Button type="secondary">Test</Button>
      </div>
    )
  }
  componentDidMount() {
    this.props.fetchQuizes()
  }

}
function mapStateToProps(state) {
  console.log(state)
  return {
    quizes: state.quiz.payload,
    loading: state.quiz.loading
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => { dispatch(fetchQuizes()) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizList)