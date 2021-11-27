import React, {Component} from 'react'
import './Instagram.scss'
import InstaItem from './InstaItem/InstaItem'
import { Instafeed } from './instafeed'
import { delay } from '../../pure/pure'
import Loader from '../../components/UI/Loader/Loader'
import { Container, Col, Row } from 'react-bootstrap'
export default class Instagram extends Component {
  state ={
    loading: true
  }
  renderInstagram(){
    return (
      <div className='instagram' id="instagram"></div>
    )
  }
  render(){
    return (
      <div className={'Instagram'}>
        <div className="text-center">
          <h1>Instagram</h1>
        </div>
        <Container fluid>
          <Row>
            {this.state.loading ? <Loader></Loader> : this.renderInstagram()}            
          </Row>
        </Container>
      </div>
    )
  }
  async componentDidMount(){
    await delay(300)
    this.setState({
      loading:false
    })
    await promiseFeed()
  }
}


function promiseFeed(){
  return new Promise((resolve)=>{
    var feed = new Instafeed({
      accessToken: 'IGQVJXcnA1R0N0bFUxelhaRlNwUFJoNzdQSVI5MTllcnFUZA3l1ekkxZA2JDa2NfU1hRY3BlOXNLTWRqUkc1TGU1cU9TeWJHTkxQYmhoZAEpKUGhEOEY5SWZAwZA21GZAmwtMjF5ZAndSSEwzSWhJMFBkcHp5RQZDZD'
    });
    feed.run()
    resolve(feed)
  })
}