import React from "react";
import classes from './Button.module.css'

export const Button = props => {
  const cls = [
    classes.button,
    classes[props.type]
  ]
  return (
    <button
      onClick={props.onButtonHandler}
      className={cls.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}