import React, { Component } from 'react'
import classes from './Flowers.module.scss'
import Loader from '../../components/UI/Loader/Loader'
import axios from 'axios'
import { delay } from '../../pure/pure'
import Item from '../../components/FlowerItem/FlowerItem'
import { Button, Container, Row, Col } from 'react-bootstrap';
export default class Flowers extends Component {
  state = {
    flowers: [],
    loading: true
  }
  render() {
    return (
      <div className={classes.Flowers} style={this.state.loading ? { height: '100%' } : { height: null }}>
        <Container className={this.state.loading ? classes.whileLoading : null}>
          <Row className={this.state.loading ? classes.whileLoading : null}>
            {this.state.loading ? this.renderLoader() : this.renderItems()}
          </Row>
          <Row>
            <div className='text-center mt-4'>
              <Button variant="warning">Button #1</Button>
            </div>
          </Row>
        </Container> 
      </div>
    )
  }
  async componentDidMount() {
    try {
      const response = await axios.get('https://react-quiz-ce9f7-default-rtdb.europe-west1.firebasedatabase.app/storage.json')
      const { data } = response
      const flowerGroup_value = Object.entries(data)[0][1]
      const flowers = []
      Object.keys(flowerGroup_value).forEach(flowerName => {
        const flower = flowerGroup_value[flowerName]
        const { name, img, price } = flower
        flowers.push(
          { name, img, price }
        )
      })
      await delay(700)
      this.setState({
        flowers,
        loading: false
      })
    } catch (error) {
      console.log(error)
    }
  }
  renderItems() {
    return this.state.flowers.map((flower, index) => {
      return <Col key={index} xs={6} md={3}>
        <Item 
          img={flower.img} 
          name={flower.name}
          price={flower.price} 
        >
        </Item>
      </Col> 
    })
  }
  renderLoader() {
    return (
      <Loader color={'black'}></Loader>
    )
  }
}