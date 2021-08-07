import React from "react";
import { connect } from "react-redux";
// AN Edit: Importing NavLink For Style
import { Link, NavLink } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    {/* AN Edit - Temp Styling Nav Bar */}
    <nav className="navbar navnar-expand-sm bg-dark navbar-dark">
      {isLoggedIn ? (
        <div className="container">
          {/* The navbar will show these links after you log in */}
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/genies">All Genies</NavLink>
          <NavLink to="/orders">Cart</NavLink>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="container">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <NavLink to="/genies">All Genies</NavLink>
          <NavLink to="/orders">Cart</NavLink>

        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
