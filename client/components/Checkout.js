// AN Edits:
// Import React so we can use React.Component.
import React, { Component } from "react";
// Import connect so we can connect our redux store to our react components.
import { connect } from "react-redux";

// Write a class component for the checkout page.
export class CheckoutCart extends Component {
    constructor (props) {
        super (props) = {
            this.state = {
                name: '',
                address: '',
                email: '',
            }
        }
    }
}



// AN Notes: I will need to make the checkout screen a form so the user can fill out their information.
// I will need to get all of that form data into my db in the order table.
// If the user is a guest, on submit, submit an empty user id.  
// On submit check if the user exists and if they do, update their existing info with the new details they provided.