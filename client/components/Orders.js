import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/orders";
import { formatCurrency } from "./util"

class Orders extends Component {
  constructor(props) {
    super(props);
    // AN Note: Displaying Cart on Orders Page:
    // If local storage cart exists, this.cart = local storage cart.
    // If it doesn't, set this.cart to an empty array.
    this.cart = JSON.parse(window.localStorage.getItem("Cart")) || [];
    // AN Note: Creating a countMap to track qty of the cart.
    this.cartMap = {};
    this.cart.forEach((genie) => {
      if (this.cartMap[genie.name]) {
        this.cartMap[genie.name].qty += 1;
      } else {
        this.cartMap[genie.name] = { qty: 1, genieObject: genie };
      }
    });
    this.startingKeyForMap = 1;
    this.state = { cart: this.cart, cartMap: this.cartMap };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }
  componentDidMount() {
    // AN Note: I think the strategy here should be if the orderId exists (aka a user is logged in), retrieve the cart based on their userId.
    // However, if they do not and it's a guest cart, retrieve based on orderId (whick we should save somehow in local storage).
    // let orderId = this.props.match.params.id;
    // console.log("these are the props!" , this.props);
    // this.props.fetchOrder(this.props.order.id);
  }

  handleIncrement(evt) {
    let genieName = evt.target.name;
    this.setState({ cartMap: (this.cartMap[genieName].qty += 1) });
    // AN Note: I know this is inefficient and I should've structured the cart in local storage as a dictionary to begin with.
    // But this works so I'm leaving it.
    let updatedCartForLocalStorage = [];
    Object.values(this.cartMap).forEach((genieInQuestion) => {
      for (let i = 0; i < genieInQuestion.qty; i++) {
        updatedCartForLocalStorage.push(genieInQuestion.genieObject);
      }
    });
    window.localStorage.setItem(
      "Cart",
      JSON.stringify(updatedCartForLocalStorage)
    );
  }

  handleDecrement(evt) {
    let genieName = evt.target.name;
    this.setState({ cartMap: (this.cartMap[genieName].qty -= 1) });
    if (this.cartMap[genieName].qty <= 0) {
      delete this.cartMap[genieName];
    }
    // AN Note: I know this is inefficient and I should've structured the cart in local storage as a dictionary to begin with.
    // But this works so I'm leaving it.
    let updatedCartForLocalStorage = [];
    Object.values(this.cartMap).forEach((genieInQuestion) => {
      for (let i = 0; i < genieInQuestion.qty; i++) {
        updatedCartForLocalStorage.push(genieInQuestion.genieObject);
      }
    });
    window.localStorage.setItem(
      "Cart",
      JSON.stringify(updatedCartForLocalStorage)
    );
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }

  render() {
    // AN Note: Rendering cart into a table.
    const { cart } = this.state;
    let key = this.startingKeyForMap;
    return (
      <div className="container">
        <div className="d-sm-flex justify-content-between align-items-center">
          <h2>Cart</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Genie Name</th>
              <th scope="col">Qty</th>
              <th scope="col">Price Per Item</th>
              <th scope="col">Total Cost Per Line Item</th>
              <th scope="col">Increase Qty</th>
              <th scope="col">Decrease Qty</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.cartMap).map((item) => (
              <tr key={key}>
                <th scope="row">{key++}</th>
                <td>{item}</td>
                <td>{this.cartMap[item].qty}</td>
                <td>{this.cartMap[item].genieObject.price / 100}</td>
                <td>
                  {(this.cartMap[item].genieObject.price / 100) *
                    this.cartMap[item].qty}
                </td>
                <td>
                  <div className="text-center">
                    <button
                      name={this.cartMap[item].genieObject.name}
                      onClick={this.handleIncrement}
                      className="btn-danger btn-md"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <div className="text-center">
                    <button
                      name={this.cartMap[item].genieObject.name}
                      onClick={this.handleDecrement}
                      className="btn-danger btn-md"
                    >
                      -
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center">
          <span className="text-primary"> Total Amount Due: </span>
          {formatCurrency(Object.values(this.cartMap).reduce((acc, genieObject) => {
            return (
              acc + (genieObject.qty * genieObject.genieObject.price) / 100
            );
          }, 0))}
        </div>
        <div className="text-center">
          <button
            onClick={() => (window.location.href = `/orders/checkout`)}
            className="btn-danger btn-md"
          >
            Checkout
          </button>
        </div>
        <div></div>
      </div>
    );
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