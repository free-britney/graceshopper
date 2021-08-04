import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleGenie } from '../store/singleGenieRedux';
import { Link } from 'react-router-dom';

class SingleGenieComponent extends React.Component {
  componentDidMount() {
    this.props.loadSingleGenie(this.props.match.params.genieId);
  }

  render() {
    const genie  = this.props.genie || {}

    return (
      <div>
        <h1>Name: {genie.name}</h1>
        <h2>Price: {genie.price}</h2>
        <img src={genie.imageURL} />
        <h4>Description: {genie.description}</h4>
        <h3>Wish Quantity: {genie.wishQty}</h3>
        <h3>In stock: {genie.inventory}</h3>
        <h3>Genie ability: {genie.ability}</h3>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    genie: state.genie
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadSingleGenie: (id) => dispatch(fetchSingleGenie(id))
  }
}

export default connect(mapState, mapDispatch)(SingleGenieComponent);
