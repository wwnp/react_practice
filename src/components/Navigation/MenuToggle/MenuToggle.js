import React from 'react'
import classes from './MenuToggle.module.css'

const MenuToggle = props => {
  const cls = [
    classes.MenuToggle,
    'fa',
    props.isOpen ? `fa-times ${classes.open}` : 'fa-bars'
  ]
  // or
  // if(props.isOpen == true){
  //   cls.push('fa-times')
  // }else{
  //   cls.push('fa-bars')
  // }
  return (
    <i
      className={cls.join(' ')}
      onClick={props.onToggleHandler}
    >
    </i>
  )
}
export default MenuToggle