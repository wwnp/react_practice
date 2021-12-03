import React from 'react'
import classes from './Not.module.scss'
const Not = props => {
  const cls = [props.typeNot]
  return (
    <div className={classes.Not}>
      <span className={classes[cls.join(' ')]}>{props.valueNot}</span>
    </div>
  )
}
export default Not