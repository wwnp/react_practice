import React, { Component } from 'react'
import classes from './QuizCreator.module.scss'
import { Button } from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { createControlFramework } from '../../form/formFramework'
import Auxiliary from '../../HOC/Auxiliary/Auxiliary'
import Select from '../../components/UI/Select/Select'
import { validate } from '../../form/formFramework'
import axios from 'axios'

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
export default class QuizCreator extends Component {
  state = {
    quiz: [],
    controls: createControls(),
    rightAnswerId: 1,
    isFormValid: false,
  }
  submitHandler(e) {
    e.preventDefault()
  }
  addQuestionHandler = (e) => {
    e.preventDefault()
    const quiz = this.state.quiz.concat()
    const index = quiz.length + 1

    const questionItem = {
      question: this.state.controls.question.value,
      id: index,
      rightAnswer: this.state.rightAnswerId,
      answers: [
        { text: this.state.controls.option1.value, id: this.state.controls.option1.id },
        { text: this.state.controls.option2.value, id: this.state.controls.option2.id },
        { text: this.state.controls.option3.value, id: this.state.controls.option3.id },
        { text: this.state.controls.option4.value, id: this.state.controls.option4.id },
      ]
    }

    quiz.push(questionItem)

    this.setState({
      quiz,
      controls: createControls(),
      rightAnswerId: 1,
      isFormValid: false,
    })
  }
  createQuizHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://react-quiz-ce9f7-default-rtdb.europe-west1.firebasedatabase.app/quizes.json', this.state.quiz)
      this.setState({
        quiz: [],
        controls: createControls(),
        rightAnswerId: 1,
        isFormValid: false,
      })
    } catch (e) {
      console.log(e)
    }
    // or
    // axios.post('https://react-quiz-ce9f7-default-rtdb.europe-west1.firebasedatabase.app/quizes.json',this.state.quiz)
    //   .then((res)=>{
    //     console.log(res)
    //   })
    //   .catch(e => console.log(e))
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
        <div>
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
              disabled={this.state.quiz.length === 0}
            >
              Finish
            </Button>
          </form>
        </div>
      </div>
    )
  }
}