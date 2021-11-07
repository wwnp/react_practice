import React, { Component } from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../../UI/Button/Backdrop/Backdrop'

const links = [1, 2, 3]

class Drawer extends Component {
  // DrawerHandler(){
  //   if(this.props.menu === true){
  //     this.setState({
  //       menu: false
  //     })
  //   }
  // }
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li
          key={index}
        >
          <a href="#">Link: {link}</a>
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