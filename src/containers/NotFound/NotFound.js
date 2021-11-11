import React from 'react'
import {Link} from "react-router-dom";
const NotFound = props => {
  return (
    <React.Fragment>
      <h1>Page not found</h1>
      <Link to='/'>To Quizlist</Link>
    </React.Fragment>
  )
}   
export default NotFound