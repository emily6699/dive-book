/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getShopsThunk, addLogThunk, getSingleShopThunk} from '../store/index'
import UpdateForm from './UpdateLogForm'

class AddLog extends Component {
  constructor() {
    super()
    this.state = {
      date: '',
      diveshopId: 1,
      diveName: '',
      timeIn: '',
      timeOut: '',
      location: '',
      maxDepth: 0,
      tankPressureStart: 0,
      tankPressureEnd: 0,
      tankType: 'aluminum',
      beltWeight: 0,
      wetSuitType: 'none',
      wetSuitThickness: 0,
      airMixture: 'air',
      description: '',
      visibility: 0,
      hasStrongCurrent: false,
      displayText: false,
      offeredDiveId: 1,
      currentList: [],
      diverObservations: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchShops()
  }

  handleChange(evt) {
    if (evt.target.name === 'diveshopId') {
      //fetch single shop if id is not null
      evt.target.value && this.props.fetchSingleShop(evt.target.value)
      this.setState({displayText: false})
    }

    if (
      (evt.target.name === 'diveName' && evt.target.value === 'Other') ||
      (evt.target.name === 'diveshopId' && evt.target.value === '')
    ) {
      this.setState({displayText: true})
    }
    if (evt.target.name === 'diveName' && !this.state.displayText) {
      let [diveName, offeredDiveId] = evt.target.value.split('^')
      offeredDiveId = Number(offeredDiveId)
      this.setState({
        diveName,
        offeredDiveId
      })
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
      date: '',
      diveshopId: 1,
      diveName: '',
      timeIn: '',
      timeOut: '',
      location: '',
      maxDepth: 0,
      tankPressureStart: 0,
      tankPressureEnd: 0,
      tankType: 'aluminum',
      beltWeight: 0,
      wetSuitType: 'none',
      wetSuitThickness: 0,
      airMixture: 'air',
      description: '',
      visibility: 0,
      hasStrongCurrent: false,
      displayText: false,
      offeredDiveId: 1,
      currentList: [],
      diverObservations: []
    })
  }
  render() {
    return (
      <div className="form-container ChartContainer">
        <h3 className="page-container">New Log: </h3>
        <UpdateForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          log={this.state}
          allShops={this.props.allShops}
          singleShop={this.props.singleShop}
          enterObservation={this.enterObservation}
          keyup={this.keyup}
          removeFromList={this.removeFromList}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allShops: state.shops,
  singleShop: state.singleShop
})

const mapDispatchToProps = dispatch => ({
  fetchShops: () => dispatch(getShopsThunk()),
  fetchSingleShop: shopId => dispatch(getSingleShopThunk(shopId)),
  addLog: log => dispatch(addLogThunk(log))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddLog)
