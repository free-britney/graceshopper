import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/orders";

 class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // AN Note: I think the strategy here should be if the orderId exists (aka a user is logged in), retrieve the cart based on their userId.
    // However, if they do not and it's a guest cart, retrieve based on orderId (whick we should save somehow in local storage).
    let orderId = this.props.match.params.id;
    this.props.fetchOrder(orderId);
  }

  handleSubmit(evt) {
    evt.preventDefault();
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
