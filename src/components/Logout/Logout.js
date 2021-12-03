import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authAction, logout } from '../../redux/actions/authAction'
import classes from './Logout.module.scss'
import { Navigate } from 'react-router-dom'
class Logout extends Component {
  componentDidMount() {
    this.props.logout()
  }
  render() {
    return <Navigate to='/'></Navigate>
  }
}
function mapDispatchToProps() {
  return {
    logout: () => logout()
  }
}
export default connect(null, mapDispatchToProps)(Logout)