import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import './QuizList.scss'
import axios from 'axios'
import Loader from '../../components/UI/Loader/Loader';
import { delay } from '../../pure/pure';

export default class QuizList extends Component {
  state = {
    quizes: [],
    loading: true
  }
  renderQuizes() {
    return this.state.quizes.map((quiz, index) => {
      return (
        <li
          key={quiz.id}
        >
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
  async componentDidMount() {
    try {
      const response = await axios.get('https://react-quiz-ce9f7-default-rtdb.europe-west1.firebasedatabase.app/quizes.json')
      const quizes = []

      Object.keys(response.data).forEach((key,index) => {
        quizes.push({
          id:key,
          name:`Test №${index + 1}`
        })
      })

      await delay(700)

      this.setState({
        quizes,
        loading:false
      })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <div className='QuizList' id='test'>
        <h1>Quiz List</h1>
        {this.state.loading ? this.renderLoader() : this.renderQuizes()}
      </div>
    )
  }
}