import React from "react";
import { connect } from "react-redux";
import { fetchSingleGenie } from "../store/singleGenieRedux";
import { addToOrder } from "../store/orders";

class SingleGenieComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.loadSingleGenie(this.props.match.params.genieId);
  }

  handleClick(genieId) {
    // AN: Cart Handler
    // This is the single genie object.
    let cartGenie = this.props.genie;
    // This is saying if nothing exists in local storage called Cart,
    // Create an empty object called cart.
    // Then create an empty array called geniesInCart.
    // After that push your single genie object into that array.
    // Set a key in local storage called Cart and give it a value of your array of genie object/objects.
    if (!window.localStorage.getItem("Cart")) {
      let cart = {};
      let geniesInCart = [];
      cart.geniesInCart = geniesInCart;
      cart.geniesInCart.push(cartGenie);
      // The key to this is that local storage only holds strings.
      window.localStorage.setItem("Cart", JSON.stringify(cart.geniesInCart));
    } else {
      // However, if Cart exists, then pull the current cart down and turn it from a string into json.
      let cart = JSON.parse(window.localStorage.getItem("Cart"));
      // Push the genie object into the cart array of genie objects.
      cart.push(cartGenie);
      // Reset local storage with the updated cart.
      window.localStorage.setItem("Cart", JSON.stringify(cart));
    }
    // AN: This creates a new order everytime a genie is clicked.  I don't think we want to do that/we should maybe do this on checkout?
    this.props.addToOrder(genieId);
    alert("Added to cart!");
  }

  render() {
    const genie = this.props.genie || {};
    // AN Note: I mapped auth.id to state so I can have access to userid when someone is logged in.
    const { userId } = this.props;
    return (
      // AN Edit: Centering and adding temp styling
      <div className="container">
        <div className="card mb-3 card-body bg-warning">
          <div className="row g-0 align-items-center">
            <h1 className="card-title text-center">Name: {genie.name}</h1>
            <h2 className="card-title text-center">Price: {genie.price}</h2>
            <img src={genie.imageURL} className="img-fluid rounded" />
            <div className="card-body">
              <h4 className="card-title text-center">
                Description: {genie.description}
              </h4>
              <h3 className="card-title text-center">
                Wish Quantity: {genie.wishQty}
              </h3>
              <h3 className="card-title text-center">
                In stock: {genie.inventory}
              </h3>
              <h3 className="card-title text-center">
                Genie ability: {genie.ability}
              </h3>
              <h4 className="card-title text-center">
                {/* AN Note: This is currently a non-functioning button*/}
                <button
                  type="submit"
                  onClick={() => this.handleClick(genie.id)}
                >
                  Add To Cart
                </button>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    genie: state.genie,
    // AN Note: Mapping userid to state so we have access to it.
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleGenie: (id) => dispatch(fetchSingleGenie(id)),
    addToOrder: (genieId) => dispatch(addToOrder(genieId)),
  };
};

export default connect(mapState, mapDispatch)(SingleGenieComponent);
