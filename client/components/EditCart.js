import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateCart } from "../store/auth"

class EditCart extends Component {
  constructor(props) {

    super(props);
    this.state = {
      name: "",
      wishQty: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateCart({ ...this.props.match.params.id, ...this.state })

  }

  render() {
    const { name, wishQty } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form id="edit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleChange}
          />

          <div>
            <input
              type="integer"
              name="wishQty"
              placeholder="Quantity"
              value={wishQty}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update</button>
        </form>
        <form onSubmit={(evt) => evt.preventDefault()} />
        <Link to="/cart">Cancel</Link>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch, { history }) => ({
  updateCart: (cart) => dispatch(updateCart(cart, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCart);