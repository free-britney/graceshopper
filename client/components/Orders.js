import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/orders";

class Orders extends Component {
  constructor(props) {
    super(props);
    // AN Note: Displaying Cart on Orders Page:
    // If local storage cart exists, this.cart = local storage cart.
    // If it doesn't, set this.cart to an empty array.
    this.cart = JSON.parse(window.localStorage.getItem("Cart")) || [];
    this.state = { cart: this.cart };
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
    const { cart } = this.state;
    console.log(cart);
    return (
      <div className="container">
        <div className="d-sm-flex justify-content-between align-items-center">
          <h2>Cart</h2>
        </div>
        <div />

        <div className="container">
          <div className="row row-cols-1 row-cols-md-1 g-4">
            {cart.length === 0 ? (
              <div className="card">
                <div className="card-body">
                  <h6>**There are no items in your cart.**</h6>
                </div>
              </div>
            ) : (
              cart.map((genie) => (
                <div key={genie.id} className="col">
                  <img
                    src={genie.imageURL}
                    className="img-fluid rounded-start"
                  />
                  <div className="card bg-warning border-dark text-light">
                    <div className="card-body text-center">
                      <div className="h1">
                        <h4 className="card-title">{genie.name}</h4>

                        <h6 className="card-text">
                          <span className="text-primary">Description: </span>
                          {genie.description}
                        </h6>
                        <h6 className="card-text">
                          <span className="text-primary">Price: </span>
                          {genie.price}
                        </h6>
                        <h6 className="card-text">
                          <span className="text-primary">Wish Quantity: </span>
                          {genie.wishQty}
                          <div />
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="text-center">End of List</div>
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