import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateCart } from "../store/cart"

class EditCart extends Component {
  constructor(props) {
    console.log('props', props);
    super(props);
    this.state = {
     edit:false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }


  handleAdd(genieId,currQty, genie) {
    this.props.updatdedQty(genieId,1, genie)
  }

  handleSubtract(genieId,currQty, genie) {
    this.props.updatdedQty(genieId,-1, genie)
  }

  async handleDelete(id) {
    await this.props.deleteFromCard(id);
    this.props.getCart();
  }

  render() {
    const { cart } = this.props;
    return (
      <div className = 'cart'>
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