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
  handleAdd(evt, genie) {
    this.setState((state) => {
      const genies = state.genies;
      let genieInCart = false;
      genies.forEach((item) => {
        if (item.id === genie.id) {
          genieInCart = true;
          item.inventory++;
        }
      });
      if (!genieInCart) {
        genieInCart.push({ ...genies, inventory: 1 });
      }
      localStorage.setItem("guestCart", JSON.stringify(genieInCart));
    });
  }

  handleSubtract(evt, genie) {
    this.setState((state) => {
      const genies = state.genies;
      let genieInCart = false;
      genies.forEach((item) => {
        if (item.id === genie.id) {
          genieInCart = true;
          item.inventory--;
        }
      });
      if (!genieInCart) {
        genieInCart.push({ ...genies, inventory: 1 });
      }
      localStorage.setItem("guestCart", JSON.stringify(genieInCart));
    });
  }


  handleDelete(evt, genie) {
    this.setState((state) => {
      let updatedCart = state.genies.filter((ele) => ele.id !== genie.id);
      localStorage.setItem("guestCart", updatedCart);
      return { updatedCart };
    });
  }

  render() {
    const { genies } = this.props;
    return (
      <div>
        <div className="alert">
          {genies.length === 0 ? (
            " Cart is Empty"
          ) : (
            <div> You have {genies.length} products,</div>
          )}
          {genies.length > 0 && (
            <div>
              <ul>
                {genies.map((genie) => (
                  <li className="genie" key={genie.Id || genie.genieId}>
                    <b>{genie.name}</b>X{genie.inventory}
                    <button
                      className="Remove"
                      onClick={(e) => this.props.handleDelete(e, genie)}
                    >
                      X
                    </button>
                    <div>
                      {genies.inventory<= 10}
                        <button
                      className="Add"
                      onClick={(e) => this.props.handleAdd(e, genie)}
                    >
                      +
                    </button>

                    </div>

                    <button
                      className="Less"
                      onClick={(e) => this.props.handleSubtract(e, genie)}
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
  addToCart: (genieId) => dispatch(addToCart(genieId)),
  updatedQty: (genieId, quantity) =>
    dispatch(updateCart(genieId, quantity)),
  deleteFromCart: (id) => dispatch(deleteCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
