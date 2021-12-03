import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import './QuizList.scss'
// import axios from 'axios' // don't need already
import Loader from '../../components/UI/Loader/Loader';
import { delay } from '../../pure/pure';
import { Button } from '../../components/UI/Button/Button';

import { connect } from 'react-redux';
import { fetchQuizes } from '../../redux/actions/quizlistAction';
import { bindActionCreators } from 'redux'

import { useParams,useNavigate,useLocation } from "react-router-dom";
class QuizList extends Component {
  renderQuizes() {
    return this.props.quizList.map((quiz, index) => {
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
        {/* {this.props.loading && this.props.quizes.length !== 0 ? this.renderLoader() : this.renderQuizes()} */}
        <Button type="secondary">Test</Button>
      </div>
    )
  }
  componentDidMount() {
    this.props.fetchQuizes(this.props)
  }
}
function mapStateToProps(state) {
  return {
    quizList: state.quizList.payload,
    loading: state.quizList.loading
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: bindActionCreators(fetchQuizes,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)((props)=> {
  const param = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  return <QuizList {...props} param={param} navigate={navigate} location={location}/>
})