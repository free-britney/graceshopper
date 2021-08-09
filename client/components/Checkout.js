// AN Edits:
// Import React so we can use React.Component.
import React from "react";
// Import connect so we can connect our redux store to our react components.

// Write a class component for the checkout page.
export class CheckoutCart extends React.Component {
  constructor() {
    super();
    this.cart = JSON.parse(window.localStorage.getItem("Cart")) || [];
    this.state = {
      name: "",
      address: "",
      email: "",
      payment: "",
      //   AN Note: Guest User data should go into db with no userId.
      userId: "",
      cart: this.cart,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    // AN needs to code sending back data to db via a thunk and routes.
  }

  render() {
    const { name, address, email, payment } = this.state;
    return (
      <div className="container">
        <h2>Checkout</h2>
        <div className="container">
          <form id="shipping-order-info" onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name:
              </label>
              <input
                className="form-control"
                name="name"
                onChange={this.handleChange}
                value={name}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="address">
                Address:
              </label>
              <input
                className="form-control"
                name="address"
                onChange={this.handleChange}
                value={address}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email Address:
              </label>
              <input
                className="form-control"
                name="email"
                onChange={this.handleChange}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="payment">
                Payment Details:
              </label>
              <input
                className="form-control"
                name="payment"
                onChange={this.handleChange}
                value={payment}
              />
            </div>
            <button className="btn-success" type="submit">
              Purchase
            </button>
          </form>
        </div>
      </div>
    );
  }
}

// AN Notes: I will need to make the checkout screen a form so the user can fill out their information.
// I will need to get all of that form data into my db in the order table.
// If the user is a guest, on submit, submit an empty user id.
// On submit check if the user exists and if they do, update their existing info with the new details they provided.
