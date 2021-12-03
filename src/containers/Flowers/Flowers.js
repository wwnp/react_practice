import React, { Component } from 'react'
import classes from './Flowers.module.scss'
import Loader from '../../components/UI/Loader/Loader'
import Item from '../../components/FlowerItem/FlowerItem'
import { Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { fetchFlowers } from '../../redux/actions/flowersAction'
import Not from '../../components/UI/Not/Not';
import { showNot } from '../../redux/actions/notAction';
import { bindActionCreators } from 'redux'
import {NOTIFICATIONS} from '../../pure/pure'
class Flowers extends Component {
  render() {
    return (
      <div className={classes.Flowers} style={this.props.loading ? { height: '100%' } : { height: null }}>
        <Container className={this.props.loading ? classes.whileLoading : null}>
          <Row className={this.props.loading ? classes.whileLoading : null}>
            {this.props.loading ? this.renderLoader() : this.renderItems()}
          </Row>
          <Row>
            <div className='text-center mt-4'>
              <Button variant="warning" onClick={() => this.props.showNot(NOTIFICATIONS.error.valueNot,NOTIFICATIONS.error.typeNot)}>Button #1</Button>
              <Button variant="danger">Button #1</Button>
            </div>
            {this.props.not ? <Not valueNot={this.props.valueNot} typeNot={this.props.typeNot}></Not> : null}
            {/* {this.props.not ? <Not value={this.props.valueNot} type={this.props.typeNot}></Not> : null} */}
          </Row>
        </Container>
      </div>
    )
  }
  componentDidMount() {
    this.props.fetchFlowers()
  }
  renderItems() {
    return this.props.flowers.map((flower, index) => {
      return <Col key={index} xs={6} md={3}>
        <Item
          img={flower.img}
          name={flower.name}
          price={flower.price}
          flowerName={flower.flowerName}
          flowerGroup_name={flower.flowerGroup_name}
        >
        </Item>
      </Col>
    })
  }
  renderLoader() {
    return (
      <Loader color={'white'}></Loader>
    )
  }
}
function mapStateToProps(state) {
  return {
    flowers: state.flowers.flowers,
    loading: state.flowers.loading,
    not: state.not.show,
    valueNot: state.not.valueNot,
    typeNot: state.not.typeNot,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchFlowers: () => { dispatch(fetchFlowers()) },
    // showNot: () => dispatch(showNot())
    showNot: bindActionCreators(showNot,dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Flowers)
