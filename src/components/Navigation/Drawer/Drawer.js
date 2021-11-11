import React, { Component } from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Button/Backdrop/Backdrop'
import { NavLink } from "react-router-dom";
import { routes } from '../../../routes';
import './Drawer.scss'

class Drawer extends Component {
  renderLinks() {
    return Object.entries(routes).map(([title, location], index) => {
      return (
        <li key={index}>
          <NavLink 
            to={location}
            onClick={this.props.BackdropHandler}
          >
            {title}
          </NavLink>
        </li>
      )
    })
  }
  render() {
    const cls = [
      classes.Drawer,
      this.props.isOpen ? null : classes.close
    ]
    // if(!this.props.isOpen){
    //   cls.push('close')
    // }
    return (
      <React.Fragment>
        <nav
          className={cls.join(' ')}
        >
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        {this.props.isOpen
          ? <Backdrop
            isOpen={this.props.isOpen}
            BackdropHandler={this.props.BackdropHandler}
          >
          </Backdrop>
          : null
        }

      </React.Fragment>
    )
  }
}
export default Drawer