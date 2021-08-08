import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder,deleteGenie,editQuantity, addGenieToOrder, } from "../store/orders";
import { axios } from "axios";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.cart = JSON.parse(window.localStorage.getItem("Cart")) || [];
    this.state = { cart: this.cart };
    // AN Note: Displaying Cart on Orders Page:
    // If local storage cart exists, this.cart = local storage cart.
    // If it doesn't, set this.cart to an empty array.

    console.log('props',props);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleAdd = this.handleAdd.bind(this);
    // this.handleSubtract = this.handleSubtract(this);
    // this.handleDelete = this.handleDelete(this);
  }
  componentDidMount() {
    // AN Note: I think the strategy here should be if the orderId exists (aka a user is logged in), retrieve the cart based on their userId.
    // However, if they do not and it's a guest cart, retrieve based on orderId (whick we should save somehow in local storage).
    // let orderId = this.props.match.params.id;
    // console.log("these are the props!" , this.props);
    // const cart = JSON.parse(window.localStorage.getItem("Cart")) || [];
    // this.setState = { cart: cart };
    this.props.fetchOrder(this.props.order.id);
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }
//   async handleAdd(evt) {
//     evt.persist()
//         if(this.props.userId){
//         const addQty = evt.target.value
//         const { data } = await axios.get(`/api/genies/${evt.target.id}`)
//         await this.props.addQty([this.props.cart.userId, data, addQty])
//         console.log('props',this.props)
//     } else {
//         let existingCart = JSON.parse(localStorage.getItem('Cart'))
//         let truthy;
//         let id = Number(evt.target.id)
//         if (!existingCart) {
//           existingCart = []
//         localStorage.setItem('Cart', JSON.stringify(existingCart))
//         } else {
//           //here it maps through the elements in the ucrrent cart, if it finds one it iterates the quantity
//        existingCart.map(genie => {
//           if(genie.id === id) {
//             genie.wishQty++
//             truthy = true
//             return truthy
//           }
//       })
//       }
//         this.setState({cart: existingCart})
//        localStorage.setItem('Cart', JSON.stringify(existingCart))}
//   }

//   async handleSubtract(evt) {
//     evt.persist()
//     if(this.props.userId){
//     const lessQty = evt.target.value
//     const { data } = await axios.get(`/api/genies/${evt.target.id}`)
//     await this.props.lessQty([this.props.cart.userId, data, lessQty])
// } else {
//     let existingCart = JSON.parse(localStorage.getItem('Cart'))
//     let id = Number(evt.target.id)
//     if (!existingCart) {
//       existingCart = []
//     localStorage.setItem('Cart', JSON.stringify(existingCart))
//     } else {
//       //here it maps through the elements in the ucrrent cart, if it finds one it iterates the quantity
//    existingCart.map(genie => {
//       genie.id === id && genie.wishQty>1 && genie.wishQty--;
//   })
//   }
//     this.setState({cart: existingCart})
//    localStorage.setItem('Cart', JSON.stringify(existingCart))}
//   }
//   handleDelete(id) {
//     let existingCart = JSON.parse(localStorage.getItem('Cart'));
//         let cartAfterDelete = existingCart.filter(element => element.id !== id);
//         this.setState({ cart: cartAfterDelete });
//         localStorage.setItem('Cart', JSON.stringify(cartAfterDelete));
//     }


  render() {
    const { cart } = this.state;
    console.log('cart',cart);
    return (
      <div className="container">
        <div className="d-sm-flex justify-content-between align-items-center">
          <h2>Cart</h2>
        </div>
        <div />

        <div className="container">
          <div className="row row-cols-1 row-cols-md-1 g-4">
            {cart.length === 0 ? (
              <div className="card">
                <div className="card-body">
                  <h6>**There are no items in your cart.**</h6>
                </div>
              </div>
            ) : (
              cart.map((genie) => (
                <div key={genie.id} className="col">
                  <img
                    src={genie.imageURL}
                    className="img-fluid rounded-start"
                  />
                  <div className="card bg-warning border-dark text-light">
                    <div className="card-body text-center">
                      <div className="h1">
                        <h4 className="card-title">{genie.name}</h4>
                        {/* <button
                                onClick={() =>
                                    this.props.handleDelete(
                                        genie.id,
                                        genie.name)
                                }>
                                   X Remove
                                </button> */}

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
                          {/* {genie.wishQty >1 &&
                                <button id={genie.id} value={"decrement"} onClick={this.handleSubtract}>-</button>

                            }
                            <button id={genie.id} value={"increment"} onClick={this.handleAdd}>+</button> */}
                          <div />
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

const mapState = (state) => {
  return {
    order: state.order,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrder: (orderId) => dispatch(fetchOrder(orderId)),
    // deleteGenie:(id,name) =>dispatch(deleteGenie(id,name)),
    // addQty:(genie)=> dispatch(addGenieToOrder(genie)),
  //   lessQty:(genie) => dispatch(editQuantity(genie))
  };
};

export default connect(mapState, mapDispatch)(Orders);
