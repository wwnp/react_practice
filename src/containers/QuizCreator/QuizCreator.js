import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import { createControlFramework, validate } from '../../form/formFramework'
import Auxiliary from '../../HOC/Auxiliary/Auxiliary'
import { addQuestion, finishQuiz } from '../../redux/actions/quizCreateAction'
import classes from './QuizCreator.module.scss'
import { bindActionCreators } from 'redux'
import Not from '../../components/UI/Not/Not'
import { showNot } from '../../redux/actions/notAction'
import { NOTIFICATIONS } from '../../pure/pure'

const INPUT_LENGTH = 3
function createControls() {
  return {
    question: createControlFramework({
      label: 'Question',
      errorMsg: 'Incorrect question'
    }, { required: true }),
    option1: createOptions(1),
    option2: createOptions(2),
    option3: createOptions(3),
    option4: createOptions(4),
  }
}
function createOptions(number) {
  return createControlFramework({
    label: `Variant ${number}`,
    errorMsg: `At least ${INPUT_LENGTH} symbols`,
    id: number
  }, { required: true, minLength: INPUT_LENGTH, shouldValidate: true })
}
class QuizCreator extends Component {
  state = {
    controls: createControls(),
    rightAnswerId: 1,
    isFormValid: false,
  }
  submitHandler(e) {
    e.preventDefault()
  }
  addQuestionHandler = (e) => {
    e.preventDefault()
    try {
      const questionItem = {
        question: this.state.controls.question.value,
        id: this.props.quiz + 1,
        rightAnswer: this.state.rightAnswerId,
        answers: [
          { text: this.state.controls.option1.value, id: this.state.controls.option1.id },
          { text: this.state.controls.option2.value, id: this.state.controls.option2.id },
          { text: this.state.controls.option3.value, id: this.state.controls.option3.id },
          { text: this.state.controls.option4.value, id: this.state.controls.option4.id },
        ]
      }
      this.props.addQuestion(questionItem)
      this.setState({
        controls: createControls(),
        rightAnswerId: 1,
        isFormValid: false,
      })
      this.props.showNot(NOTIFICATIONS.successAddQuestion.valueNot,NOTIFICATIONS.successAddQuestion.typeNot)
    } catch (error) {
      this.props.showNot(NOTIFICATIONS.errorAddQuestion.valueNot, NOTIFICATIONS.errorAddQuestion.typeNot)
    }
  }
  createQuizHandler = (e) => {
    e.preventDefault()
    this.setState({
      controls: createControls(),
      rightAnswerId: 1,
      isFormValid: false,
    })
    this.props.finishQuiz(this.props.quiz)
  }
  onChangeHandler = (e, controlName) => {
    const controls = { ...this.state.controls }
    const control = controls[controlName]

    control.value = e.target.value
    control.touched = true
    control.valid = validate(control.value, control.validation) // Вместо  метода validateControl,  validate из formFramework , тоже самое по сути

    controls[controlName] = control

    let isFormValid = true

    Object.keys(controls).forEach((controlName2) => {
      isFormValid = controls[controlName2].valid && isFormValid
    })

    this.setState({
      controls, isFormValid
    })
  }
  // validateControl(value, validation) {
  //   if (!validation) {
  //     return true
  //   }
  //   let isValid = true
  //   if (validation.required) {
  //     isValid = value.trim() !== '' && isValid
  //   }
  //   if (validation.minLength) {
  //     isValid = value.length >= validation.minLength && isValid
  //   }
  //   return isValid
  // } // Вместо этого метода , функция validate из formFramework , тоже самое по сути
  renderInputs() {
    return Object.entries(this.state.controls).map((control, index) => {
      const controlName = control[0] // question; option1; option2 ...
      const controlValue = control[1] // {label: 'Question', errorMsg: 'Incorrect question', validation: {…}, valid: false, touched: false, …} ...
      // if(index === 0) {
      //   return <textarea name="asd" id="" cols="30" rows="10"></textarea>
      // }
      return (
        <Auxiliary
          key={index}
        >
          <Input
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
          {index === 0 ? <hr /> : null}
        </Auxiliary>
      )
    })
  }
  selectChangeHandler = (e) => {
    this.setState({
      rightAnswerId: +e.target.value
    })
  }
  render() {
    return (
      <div className={classes.QuizCreator}>
        {this.props.not ? <Not valueNot={this.props.valueNot} typeNot={this.props.typeNot}></Not> : null}
        <div className={classes.QuizDiv}>
          <h1>QuizCreator</h1>
          <form onSubmit={this.submitHandler.bind(this)}>
            {this.renderInputs()}
            <hr />
            <Select
              label={'Choose right answer'}
              value={this.state.rightAnswerId}
              onChangeHandler={this.selectChangeHandler}
              options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
              ]}
            >
            </Select>
            <br />
            <Button
              type={'primary'}
              onButtonHandler={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add
            </Button>
            <Button
              type={'success'}
              onButtonHandler={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >
              Finish
            </Button>
          </form>
        </div>
      </div >
    )
  }
}
function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
    not: state.not.show,
    opacity: state.not.opacity,
    valueNot: state.not.valueNot,
    typeNot: state.not.typeNot,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addQuestion: bindActionCreators(addQuestion, dispatch),
    finishQuiz: bindActionCreators(finishQuiz, dispatch),
    showNot: bindActionCreators(showNot, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)