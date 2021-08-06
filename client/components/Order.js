import React, { Component } from "react";
import { connect } from "react-redux";
import { addToOrder } from "../store/orders";

export class Order extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  componentDidMount() {
    // console.log(this.props);
    this.props.addToOrder(this.props.genieId);
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
  };
  render() {
    const { genie } = this.props.genie;
    console.log(genie);
    return (
      <div>
        {" "}
        Genies:{" "}
        {genie &&
          genie.map((genie) => {
            return <div key={genie.id}>{genie.name}</div>;
          })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    genie: state.genie,
  };
};

const mapDispatch = (dispatch) => ({
  addToOrder: (genieId) => dispatch(addToOrder(genieId)),
});

export default connect(mapState, mapDispatch)(Order);

// grab everything the user has
// just render what they have
// take into account guest
// look into local storage