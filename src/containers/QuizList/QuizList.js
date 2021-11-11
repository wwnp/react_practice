import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import './QuizList.scss'

export default class QuizList extends Component {
  renderQuizes() {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li
          key={index}
        >
          <NavLink to={'/quiz/' + quiz}>Test: № {index+1}</NavLink>
        </li>
      )
    })
  }
  render() {
    return (
      <div className='QuizList'>
        <h1>Quiz List</h1>
        {this.renderQuizes()}
      </div>
    )
  }
}