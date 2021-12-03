import React, { Component } from 'react'
import './Auth.scss'
import { Button } from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
// import is from 'is_js'
import axios from 'axios'
import { connect } from 'react-redux'
import { authAction } from '../../redux/actions/authAction'
class Auth extends Component {
  state = {
    isFormValid: false,
    controls: {
      'email': {
        type: 'email',
        value: '',
        errorMsg: 'Appropriate email pattern: quiz@mail.com',
        label: 'Email',
        valid: false,
        touched: false,
        shouldValidate: true,
        validation: {
          required: true,
          email: true
        }
      },
      'password': {
        type: 'password',
        value: '',
        errorMsg: `Password has to contain at least 6 symbols`,
        label: 'Password',
        valid: false,
        touched: false,
        shouldValidate: true,
        validation: {
          required: true,
          minLength: 6
        }
      },
    },
    logining: false,
    responseAnswer: null
  }
  loginHandler = () => {
    this.props.authAction(
      this.state.controls.email.value,
      this.state.controls.password.value,
      true
    )
    // const authData = {
    //   email: this.state.controls.email.value,
    //   password: this.state.controls.password.value,
    //   returnSecureToken: true
    // }
    // try {
    //   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUwRH5FVQMXegoYOWsYyJZj4FtaL88V3g', authData)
    //   this.setState({
    //     responseAnswer: 'success'
    //   })
    // } catch (error) {
    //   this.setState({
    //     responseAnswer: 'error'
    //   })
    // }
    // finally {
    //   this.setState({ 
    //     logining: true,
    //   })
    // }
    this.setState({
      logining: true,
    })
  }
  registerHandler = () => {
    this.props.authAction(
      this.state.controls.email.value,
      this.state.controls.password.value,
      false
    )
    // const authData = {
    //   email: this.state.controls.email.value,
    //   password: this.state.controls.password.value,
    //   returnSecureToken: true
    // }
    // try {
    //   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUwRH5FVQMXegoYOWsYyJZj4FtaL88V3g', authData)
    //   this.setState({

    //   })
    // } catch (error) {
    //   console.log(error)
    // }
  }
  submitHandler = (e) => {
    e.preventDefault()
  }

  onChangeHandler(e, controlName) {
    const controls = { ...this.state.controls }
    const control = controls[controlName]
    control.value = e.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
    controls[controlName] = control

    let isFormValid = true
    Object.keys(controls).forEach((controlName2) => {
      isFormValid = controls[controlName2].valid && isFormValid
    })

    this.setState({
      isFormValid, controls
    })
  }
  validateControl(value, validation) {
    if (!validation) {
      return true
    }
    let isValid = true
    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }
    return isValid
  }
  renderInputs() {
    return Object.entries(this.state.controls).map((control, index) => {
      let controlName = control[0] // email ; password
      let controlValue = control[1] // {type: 'email', value: '', errMsg: 'Wrong email', label: 'Email', valid: false, …} ; {type: 'password', value: '', errMsg: 'Wrong password', label: 'Password', valid: false, …}
      return <Input
        key={index}
        value={controlValue.value}
        type={controlValue.type}
        errorMsg={controlValue.errorMsg}
        label={controlValue.label}

        valid={controlValue.valid}
        touched={controlValue.touched}
        shouldValidate={controlValue.shouldValidate}

        onChangeHandler={(e) => this.onChangeHandler(e, controlName)}
      >
      </Input>
    })
  }
  renderResponse() {
    const cls = ['answer']
    if(this.props.responseAnswerType){
      cls.push(this.props.responseAnswerType)
    }
    return (
      <div className={cls.join(' ')}>
        {this.props.responseAnswerValue}
      </div>
    )
  }
  render() {
    console.log(this.props)
    return (
      <div className='Auth'>
        <div>
          <h1>Login</h1>
          <form className='AuthForm' onSubmit={this.submitHandler}>
            {this.renderInputs()}
            <Button
              type='success'
              onButtonHandler={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Enter
            </Button>
            <Button
              type='primary'
              onButtonHandler={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Register
            </Button>
          </form>
          {this.props.responseAnswerValue && this.props.responseAnswerType ? this.renderResponse() : null}
        </div>
      </div>
    )
  }
}
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function mapStateToProps(state){
  console.log(state)
  return {
    responseAnswerValue: state.auth.responseAnswer ? state.auth.responseAnswer.value : null,
    responseAnswerType: state.auth.responseAnswer ? state.auth.responseAnswer.type : null,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    authAction: (email, password, isLogin) => {
      dispatch(authAction(email, password, isLogin))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)