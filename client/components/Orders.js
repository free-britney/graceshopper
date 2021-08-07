import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/orders";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // AN Note: I think the strategy here should be if the orderId exists (aka a user is logged in), retrieve the cart based on their userId.
    // However, if they do not and it's a guest cart, retrieve based on orderId (whick we should save somehow in local storage).
    // let orderId = this.props.match.params.id;
    // console.log("these are the props!" , this.props);
    this.props.fetchOrder(this.props.order.id);
  }
  
  handleSubmit(evt) {
    evt.preventDefault();
  }
  
  render() {
    // console.log(this.props);
    return (
    <div>Orders</div>
    )
  }
}

const mapState = (state) => {
  return {
    order: state.order,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrder: (orderId) => dispatch(fetchOrder(orderId)),
  };
};

export default connect(mapState, mapDispatch)(Orders);
