import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
// AN Edit: Importing All Genies Component
import AllGenies from "./components/AllGenies";
import SingleGenieComponent from "./components/SingleGenieComponent";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import Orders from "./components/Orders";
import Admin from "./components/Admin";
// AN Edit: Importing Checkout Component
import { CheckoutCart } from "../client/components/Checkout";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      // AN Edit: Added Browser Router

      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />

            <Route exact path="/orders" component={Orders} />
            <Route exact path="/orders/checkout" component={CheckoutCart} />
            {/* AN Edit: Adding All Genies Route If Logged In */}
            <Route exact path="/genies" component={AllGenies} />
            <Route
              exact
              path="/genies/:genieId"
              component={SingleGenieComponent}
            />
            <Route path="/admin" component={Admin} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/genies" component={AllGenies} />
            <Route
              exact
              path="/genies/:genieId"
              component={SingleGenieComponent}
            />
            {/* AN Note: I think that the cart route should be /orders/:orderId */}

          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
