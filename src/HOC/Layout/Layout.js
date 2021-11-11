import React, { Component } from 'react'
import classes from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation//Drawer/Drawer.js'
import { Outlet } from "react-router-dom";
import Footer from '../../components/UI/Footer/Footer';

class Layout extends Component {
  state = {
    menu: false
  }
  onToggleHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }
  BackdropHandler(){
    this.setState({
      menu: false
    })
  }
  render() {
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={this.state.menu}
          BackdropHandler={this.BackdropHandler.bind(this)}
        >
        </Drawer>
        <MenuToggle
          onToggleHandler={this.onToggleHandler}
          isOpen={this.state.menu}
        >
        </MenuToggle>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    )
  }
}
export default Layout