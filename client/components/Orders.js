import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/orders";

<<<<<<< HEAD
 class Orders extends Component {
=======
class Orders extends Component {
>>>>>>> 06de9ce8859706e4111d0cca7d2d84558c6914d6
  constructor(props) {
    super(props);
    this.state = {};
    console.log(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // AN Note: I think the strategy here should be if the orderId exists (aka a user is logged in), retrieve the cart based on their userId.
    // However, if they do not and it's a guest cart, retrieve based on orderId (whick we should save somehow in local storage).
<<<<<<< HEAD
    let orderId = this.props.match.params.id;
    this.props.fetchOrder(orderId);
=======
    // let orderId = this.props.match.params.id;
    // console.log("these are the props!" , this.props);
    this.props.fetchOrder(this.props.order.id);
>>>>>>> 06de9ce8859706e4111d0cca7d2d84558c6914d6
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
