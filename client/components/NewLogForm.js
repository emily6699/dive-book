import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getShopsThunk, addLogThunk} from '../store/index'
import Form from './FormContainer'

class AddLog extends Component {
  constructor() {
    super()
    this.state = {
      diveShopId: 0,
      diveName: '',
      timeIn: 0,
      timeOut: 0,
      location: '',
      maxDepth: 0,
      tankPressureStart: 0,
      tankPressureEnd: 0,
      tankType: '',
      beltWeight: 0,
      wetSuitType: '',
      wetSuitThickness: 0,
      airMixture: '',
      description: '',
      visibility: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.fetchShops()
  }

  handleChange(evt) {
    console.log('in change event:')
    console.log('value:', evt.target.value)
    if (evt.target.name === 'timeIn' || evt.target.name === 'timeOut') {
      let formattedtime = evt.target.value.split('T')
      formattedtime[1] = formattedtime[1] + ':00'
      formattedtime = formattedtime.join(' ')
      console.log('formatted time:', formattedtime)
      if (evt.target.name === 'timeIn') {
        this.setState({
          timeIn: formattedtime,
          timeOut: formattedtime
        })
      } else {
        this.setState({
          timeOut: formattedtime
        })
      }
    } else {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addLog(this.state)
    this.setState({
      diveshopId: 0,
      diveName: '',
      timeIn: 0,
      timeOut: 0,
      location: '',
      maxDepth: 0,
      pressureStart: 0,
      pressureEnd: 0,
      tankType: '',
      beltWeight: 0,
      suitType: '',
      suitThickness: 0,
      airMixture: '',
      description: '',
      visibility: 0,
      hasStrongCurrent: false
    })
  }
  render() {
    return (
      <Form
        log={this.state}
        shops={this.props.allShops}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

const mapStateToProps = state => ({
  allShops: state.shops
})

const mapDispatchToProps = dispatch => ({
  fetchShops: () => dispatch(getShopsThunk()),
  addLog: log => dispatch(addLogThunk(log))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddLog)
