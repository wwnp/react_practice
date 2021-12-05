import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import Input from '../../components/UI/Input/Input'
import classes from './Login.module.scss'
import axios from 'axios'
import { delay } from '../../pure/pure'
import Loader from '../../components/UI/Loader/Loader'
export default class Login extends Component {
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
    loading: false,
    answerFirebase: null
  }
  renderInputs() {
    return Object.keys(this.state.controls).map((controlName, index) => {
      return <Input
        key={index}
        type={this.state.controls[controlName].type}
        value={this.state.controls[controlName].value}
        label={this.state.controls[controlName].label}
        onChangeHandler={(e) => this.onChangeHandler(e, controlName)}
      >
      </Input>
    })
  }
  onChangeHandler(e, controlName) {
    e.preventDefault()
    const controlsMutant = { ...this.state.controls }
    const controlMutant = controlsMutant[controlName]
    controlMutant.value = e.target.value
    controlsMutant[controlName] = controlMutant
    this.setState({
      controls: controlsMutant
    })
  }
  async onLoginHandler(e) {
    this.setState({
      loading: true
    })

    e.preventDefault()
    try {
      const AuthData = {
        email: this.state.controls.email.value,
        password: this.state.controls.password.value,
        returnSecureToken: true
      }
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUwRH5FVQMXegoYOWsYyJZj4FtaL88V3g', AuthData)
      const { data } = response
      this.setState({
        answerFirebase: 'success'
      })
    } catch (error) {
      this.setState({
        answerFirebase: 'error'
      })
    }
    finally {
      await delay(500)
      this.setState({
        loading: false,
        logining: true,
      })
    }
  }
  answerFirebase() {
    const cls = [classes.answer]
    this.state.answerFirebase === 'success' ? cls.push(classes.success) : cls.push(classes.error)

    const answer = this.state.answerFirebase === 'success' ? 'Успешный вход' : 'Ошибка авторизации'
    return (
      <div className={cls.join(' ')}>
        <h5>{answer}</h5>
      </div>
    )
  }
  render() {
    return (
      <div className={classes.Login}>
        <div>
          <Container>
            <Row>
              <h1 className='text-center'>Login</h1>
              <Col>
                <form className=' bg-white p-4'>
                  {this.renderInputs()}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={e => this.onLoginHandler(e)}
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <div>
                  {this.state.loading
                    ? <Loader></Loader>
                    : this.state.logining ? this.answerFirebase() : null
                  }

                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}