import React, { Component } from 'react'
import './Auth.scss'
import { Button } from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
export default class Auth extends Component {
  state = {
    isFormValid: false,
    controls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMsg: 'Appropriate email pattern: quiz@mail.com',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMsg: `Password has to contain at least 6 symbols`,
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }
  loginHandler = () => {
  }
  registerHandler = () => {
  }
  submitHandler = (e) => {
    e.preventDefault()
  }
  onChangeHandler = (e, controlName) => {
    const controls = { ...this.state.controls }
    const control = { ...controls[controlName] }
    control.value = e.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
    controls[controlName] = control
    
    let isFormValid = true
    Object.keys(controls).forEach(cName => {
      isFormValid = controls[cName].valid && isFormValid
    })
    this.setState({
      controls,isFormValid
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
      isValid = is.email(value) && isValid; // npm i is_js import is from 'is_js'
      // isValid = validateEmail(value)
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }
    return isValid
  }

  renderInputs() { // controlName === 'email', 'password'
    const inputs = Object.keys(this.state.controls).map((controlName, index) => {
      const controlValue = this.state.controls[controlName] //{ value: '', type: 'email', label: 'Email', errorMsg: 'Incorrect email address ...
      return <Input
        key={index}

        value={controlValue.value}
        type={controlValue.type}
        label={controlValue.label}
        errorMsg={controlValue.errorMsg}

        valid={controlValue.valid}
        shouldValidate={true}
        touched={controlValue.touched}

        onChangeHandler={(e) => this.onChangeHandler(e, controlName)}
      >
      </Input>
    })
    return inputs
  }
  render() {
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
        </div>
      </div>
    )
  }
}
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}