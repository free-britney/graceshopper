import React from "react";
import { connect } from "react-redux";
import { fetchSingleGenie } from "../store/singleGenieRedux";

class SingleGenieComponent extends React.Component {
  componentDidMount() {
    this.props.loadSingleGenie(this.props.match.params.genieId);
  }

  render() {
    const genie = this.props.genie || {};

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
                <button type="button" className="btn-danger btg-lg">
                  Add to Cart
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleGenie: (id) => dispatch(fetchSingleGenie(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleGenieComponent);
