import React from 'react'
import classes from './Loader.module.scss'
const DEFAULT_COLOR = 'white'
const Loader = props => {
  const cls = !props.color
    ? [classes['lds-ring'], DEFAULT_COLOR]
    : [classes['lds-ring'], classes[props.color]]
  return (
    <div className={classes.center}>
      <div className={cls.join(' ')}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
export default Loader