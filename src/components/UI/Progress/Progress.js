import React from 'react'
import classes from './Progress.module.scss'
const Progress = props => {
  const state = {
    sex: props.value
  }
  return (
    <div className={classes.Progress}>
      <progress
        className={classes['progress-bar']}
        max={props.maxProgress}
        value={props.value}
      >
      </progress>
    </div>
  )
}
export default Progress