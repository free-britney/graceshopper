import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/orders";

export class Orders extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    let orderId = this.props.match.params.id
    this.props.loadOrder(orderId)
  }

  handleSubmit(evt){
    evt.preventDefault()
  }

  render() {
    // console.log(this.props)
    return (
      <div>Orders</div>
    )
  }
}

const mapState = (state) => {
  return {
    order: state.order
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadOrder: (id) => dispatch(fetchOrder(id))
  }
}

export default connect(mapState, mapDispatch)(Orders)
