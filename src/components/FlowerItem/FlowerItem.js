import React, { Component } from 'react'
import classes from './FlowerItem.module.scss'

const CURRENCY = 'руб'
const UNKNOWN_SRC = "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"

export default class FlowerItem extends Component {
  render() {
    return (
      <div className={classes.Item}>
        <div>
          {this.props.img
            ? <img src={this.props.img} alt={"Not Found"} onError={ (e)=>{e.target.onerror = null; e.target.src=UNKNOWN_SRC }  }/>
            : <img src={UNKNOWN_SRC} alt={UNKNOWN_SRC} />
          }

        </div>
        <h4>{this.props.name}</h4>
        <h4>{this.props.price} {CURRENCY}</h4>
      </div>
    )
  }
}