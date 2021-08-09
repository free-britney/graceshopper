// // AN Edits:
// // Import React so we can use React.Component.
// import { render } from "enzyme";
// import React, { Component } from "react";
// // Import connect so we can connect our redux store to our react components.
// import { connect } from "react-redux";

// // Write a class component for the checkout page.
// export default class Checkout extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       address: "",
//       email: "",
//       payment: "",
//       cart: JSON.parse(window.localStorage.getItem("Cart")) || [],
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   render() {
//     return <div>Checkout</div>;
//   }
// }

// AN Notes: I will need to make the checkout screen a form so the user can fill out their information.
// I will need to get all of that form data into my db in the order table.
// If the user is a guest, on submit, submit an empty user id.
// On submit check if the user exists and if they do, update their existing info with the new details they provided.

// export default connect(mapState, mapDispatch)(Checkout);
