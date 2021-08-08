// AN Edits:
// Import React so we can use React.Component.
import React from "react";
// Import connect so we can connect our redux store to our react components.
import { connect } from "react-redux";
// Import thunk creator to get all genies.
import { fetchGenies } from "../store/genies";
// Import link.
import { Link } from "react-router-dom";
// import { addToOrder } from "../store/orders";

// AN Edit: Write react class component to display all genies.
export class AllGenies extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getGenies();
  }
  // handleClick = (genieId) => {
  //   this.props.addToOrder(genieId);
  //   alert("Added to Cart!");
  //  }
   render() {
     // Assigned a new variable, genies, to this.props.genies.
     const genies = this.props.genies;
    //  console.log(genies);
    return (
      <div className="container">
        <div className="d-sm-flex justify-content-between align-items-center">
          <h2>All Available Genies</h2>
        </div>
        <div />

        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {genies.length === 0 || genies === undefined ? (
              <div className="card">
                <div className="card-body">
                  <h6>**There are no genies available**</h6>
                </div>
              </div>
            ) : (
              genies.map((genie) => (
                <div key={genie.id} className="col">
                  <img
                    src={genie.imageURL}

                    className="img-fluid rounded-start card-img-top"
                  />
                  <div className="card bg-warning border-dark text-light">
                    <div className="card-body text-center">
                      <div className="h1">
                        <Link to={`/genies/${genie.id}`}>
                          <h4 className="card-title">{genie.name}</h4>
                        </Link>
                        <h6 className="card-text">
                          <span className="text-primary">Description: </span>
                          {genie.description}
                        </h6>
                        <h6 className="card-text">
                          <span className="text-primary">Price: </span>
                          {genie.price}
                        </h6>
                        <h6 className="card-text">
                          <span className="text-primary">Wish Quantity: </span>
                          {genie.wishQty}
                          <div/>
                          {/* <button type="submit" onClick={() => this.handleClick(genie.id)}>Add To Cart</button> */}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              )}
          </div>
        </div>
        <div className="text-center">End of List</div>
      </div>
    );
  }
}

// Here I'm mapping state to props so I can pass my redux store items in as props to my react component.
// Here I want to props to be state.genies from my redux.
// Map state takes in state as a parameter.
// Returns an object that I can use as props.
const mapState = (state) => {
  return { genies: state.genies };
};

// Map Dispatch To Props is a function that accepts the dispatch method from the store.
// It will return an object that contains functions which will be mapped to props (after connect).
// The functions will dispatch my action creators.
const mapDispatch = (dispatch) => {
  return {
    getGenies: () => {
      dispatch(fetchGenies());
    },
    //make action here for adding to cart
    // addToOrder: (genieId) => dispatch(addToOrder(genieId))
  };
};

// Actually connect my mapState and mapDispatch to the AllGenies component for use.
export default connect(mapState, mapDispatch)(AllGenies);
