import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleGenie } from '../store/singleGenieRedux';
import { Link } from 'react-router-dom';

class SingleGenieComponent extends React.component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadSingleGenie(this.props.match.params.genieId);
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }

  render() {
    const { handleSubmit } = this;
    const genie  = this.props.genie[`${this.props.match.params.genieId}` - 1] || {}

    return (
      <div>
        <h1>{genie.name}</h1>
        <h2>{genie.price}</h2>
        <img src={genie.imageURL} />
        <p>{genie.description}</p>
        <h3>{genie.wishQty}</h3>
        <h3>{genie.inventory}</h3>
        <h3>{genie.ability}</h3>
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
