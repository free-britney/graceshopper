import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCart, updateCart, addToCart } from "../store/cart";
// import CartContainer from "./CartContainer";

class Cart extends Component {
  constructor(props) {
    console.log("props", props);
    super(props);
    this.state = {
      cart: [],
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubtract = this.handleSubtract(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    const guestCart = JSON.parse(localStorage.getItem("guestCart"));
    this.setState({ cart: guestCart });
    if (this.props.match.params.userId > 0) {
      this.props.getCart(this.props.match.params.userId);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.props.getCart(this.props.userId);
    }
  }
  handleAdd(evt, order) {
    this.setState((state) => {
      const orders = state.orders;
      let orderInCart = false;
      orders.forEach((item) => {
        if (item.id === order.id) {
          orderInCart = true;
          item.inventory++;
        }
      });
      if (!orderInCart) {
        orderInCart.push({ ...orders, inventory: 1 });
      }
      localStorage.setItem("guestCart", JSON.stringify(orderInCart));
    });
  }

  handleSubtract(evt, order) {
    this.setState((state) => {
      const orders = state.orders;
      let orderInCart = false;
      orders.forEach((item) => {
        if (item.id === order.id) {
          orderInCart = true;
          item.inventory--;
        }
      });
      if (!orderInCart) {
        orderInCart.push({ ...orders, inventory: 1 });
      }
      localStorage.setItem("guestCart", JSON.stringify(orderInCart));
    });
  }


  handleDelete(evt, order) {
    this.setState((state) => {
      let updatedCart = state.orders.filter((ele) => ele.id !== order.id);
      localStorage.setItem("guestCart", updatedCart);
      return { updatedCart };
    });
  }

  render() {
    const { orders } = this.props;
    console.log("orders",orders)
    return (
      <div>
        <div className="alert">
          {orders.length === 0 ? (
            " Cart is Empty"
          ) : (
            <div> You have {orders.length} products,</div>
          )}
          {orders.length > 0 && (
            <div>
              <ul>
                {orders.map((order) => (
                  <li className="order" key={order.Id || order.orderId}>
                    <b>{order.name}</b>X{order.inventory}
                    <button
                      className="Remove"
                      onClick={(e) => this.props.handleDelete(e, order)}
                    >
                      X
                    </button>
                    <div>
                      {orders.inventory<= 10}
                        <button
                      className="Add"
                      onClick={(e) => this.props.handleAdd(e, order)}
                    >
                      +
                    </button>

                    </div>

                    <button
                      className="Less"
                      onClick={(e) => this.props.handleSubtract(e, order)}
                    >
                      -
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addToCart: (orderId) => dispatch(addToCart(orderId)),
  updatedQty: (orderId, quantity) =>
    dispatch(updateCart(orderId, quantity)),
  deleteFromCart: (id) => dispatch(deleteCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
