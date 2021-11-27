import React, { Component } from 'react'
import classes from './FlowerItem.module.scss'
import {Link } from "react-router-dom";

const CURRENCY = 'руб'
const UNKNOWN_SRC = "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"

export default class FlowerItem extends Component {
  render() {
    return (
      <div className={classes.Item}>
        <Link to={`/flowers/`+ this.props.flowerGroup_name + '/' + this.props.flowerName}>
          <div>
            <img src={this.props.img} alt={this.props.img} onError={(e) => { e.target.onerror = null; e.target.src = UNKNOWN_SRC }} />
          </div>
        </Link>

        <h4>{this.props.name}</h4>
        <h4>{this.props.price} {CURRENCY}</h4>
      </div>
    )
  }
}