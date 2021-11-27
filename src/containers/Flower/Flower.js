import React, { Component } from 'react'
import classes from './Flower.module.scss'
import axios from 'axios'
import { delay } from '../../pure/pure'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from '../../components/UI/Loader/Loader';
import { Button } from '../../components/UI/Button/Button';
class Flower extends Component {
  state = {
    name: '',
    img: '',
    price: '',
    loading: true
  }
  renderLoader() {
    return <Loader color='black'></Loader>
  }
  renderFlower() {
    return <div className={classes.Flower__inner}>
      <div>
        <img src={this.state.img} alt={this.state.img} />
      </div>
      <h1>{this.state.name}</h1>
      <h1>{this.state.price}</h1>
      <Button
        type={'primary'}
        onButtonHandler={() => this.props.navigate('/flowers')}>
        Back
      </Button>
    </div>
  }
  render() {
    return (
      <div className={classes.Flower}>
        {this.state.loading ? this.renderLoader() : this.renderFlower()}
      </div>
    )
  }
  async componentDidMount() {
    try {
      const hashType = this.props.param.hash1
      const hashFlower = this.props.param.hash2
      const response = await axios.get(`https://react-quiz-ce9f7-default-rtdb.europe-west1.firebasedatabase.app/storage/${hashType + '/' + hashFlower}.json`)
      const { data } = response

      await delay(500)

      this.setState({
        name: data.name,
        img: data.img,
        price: data.price,
        loading: false
      })
    } catch (error) {
    }
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
  const params = useParams()
  const navigate = useNavigate()
  return <Flower {...props} param={params} navigate={navigate}></Flower>
}