import React from 'react'
import classes from './Input.module.scss'
const Input = props => {
  const inputType = props.type || 'text'
  const cls = [classes.Input]
  const htmlFor = `${inputType}--${Math.random()}`.slice(0, 15)
  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }
  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChangeHandler}
      />
      {isInvalid(props)
        ? <span>{props.errorMsg || "Error"}</span>
        : null
      }

    </div>
  )
}
export default Input
function isInvalid({ valid, shouldValidate, touched }) {
  return !valid && shouldValidate && touched
}