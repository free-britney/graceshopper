import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder,deleteGenie,editQuantity, addGenieToOrder, } from "../store/orders";
import { axios } from "axios";

class Orders extends Component {
  constructor(props) {
    super(props);
    // this.cart = JSON.parse(window.localStorage.getItem("Cart")) || [];
    // this.state = { cart: this.cart };
    // AN Note: Displaying Cart on Orders Page:
    // If local storage cart exists, this.cart = local storage cart.
    // If it doesn't, set this.cart to an empty array.
    this.cart = JSON.parse(window.localStorage.getItem("Cart")) || [];
    // AN Note: Creating a countMap to track qty of the cart.
    this.cartMap = {};
    this.cart.forEach((genie) => {
      if (this.cartMap[genie.name]) {
        this.cartMap[genie.name].qty += 1;
      } else {
        this.cartMap[genie.name] = { qty: 1, genieObject: genie };
      }
    });
    this.startingKeyForMap = 1;
    this.state = { cart: this.cart };


    console.log('props',props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubtract = this.handleSubtract(this);
    this.handleDelete = this.handleDelete(this);
  }
  componentDidMount() {
    // AN Note: I think the strategy here should be if the orderId exists (aka a user is logged in), retrieve the cart based on their userId.
    // However, if they do not and it's a guest cart, retrieve based on orderId (whick we should save somehow in local storage).
    // let orderId = this.props.match.params.id;
    // console.log("these are the props!" , this.props);
    const cart = JSON.parse(window.localStorage.getItem("Cart")) || [];
    this.setState = { cart: cart };
    this.props.fetchOrder(this.props.order.id);
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }
  handleAdd(genieId,qty,genie) {
    this.props.addQty(genieId,1,genie);
  }
  // async handleAdd(evt) {
  //   console.log('Sunitha', this.props);
  //   evt.persist()
  //       if(this.props.userId){
  //       const addQty = evt.target.value

  //       const { data } = await axios.get(`/api/genies/${evt.target.id}`)
  //       console.log('qty', data)
  //       await this.props.addQty([this.props.cart.userId, data, addQty])
  //       //console.log('props',this.props)
  //   } else
  //   {
  //       let existingCart = JSON.parse(localStorage.getItem('Cart'))
  //       console.log('existingcart', existingCart);
  //       let truthy =false;
  //       let id = Number(evt.target.id)
  //       console.log('id',id);

  //       // if (!existingCart) {
  //       //   existingCart = []
  //       // localStorage.setItem('Cart', JSON.stringify(existingCart))
  //       // } else
  //       {

  //      existingCart.map(genie => {
  //       console.log('genieId',genie.id)
  //         if(genie.id === id) {
  //           console.log('genie.id and id',genie.id,id)
  //           genie.name.qty++
  //           truthy = true
  //           return truthy
  //         }
  //     })
  //     }
  //       this.setState({cart: existingCart})
  //      localStorage.setItem('Cart', JSON.stringify(existingCart))}
  // }
  async handleSubtract(event) {
    const { data } = await axios.get(`/api/products/${event.target.id}`)
    await this.props.lessQty([this.props.cart.userId, data, 'lessQty'])
}


  async lessQuantity(evt) {

    let existingCart = JSON.parse(localStorage.getItem('Cart'))
    let id = Number(evt.target.id)
    if (!existingCart) {
      existingCart = []
    localStorage.setItem('Cart', JSON.stringify(existingCart))
    } else {
      //here it maps through the elements in the ucrrent cart, if it finds one it iterates the quantity
   existingCart.map(genie => {
      genie.id === id && genie.qty>1 && genie.qty--;
  })

    this.setState({cart: existingCart})
   localStorage.setItem('Cart', JSON.stringify(existingCart))}
  }
  async handleDelete(id) {
    // let existingCart = JSON.parse(localStorage.getItem('Cart'));
    //     let cartAfterDelete = existingCart.filter(element => element.id !== id);
    //     this.setState({ cart: cartAfterDelete });
    //     localStorage.setItem('Cart', JSON.stringify(cartAfterDelete));
    await this.props.deleteGenie(id);
    this.props.getCart();
    }


    render() {
        // AN Note: Rendering cart into a table.
        const { cart } = this.state;
        let key = this.startingKeyForMap;
        return (
          <div className="container">
            <div className="d-sm-flex justify-content-between align-items-center">
              <h2>Cart</h2>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Genie Name</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price Per Item</th>
                  <th scope="col">Total Cost Per Line Item</th>
                  <th scope="col">Add Qty</th>
                  <th scope="col">Less Qty</th>
                  <th scope = 'col'>Remove</th>
                </tr>
              </thead>
              <tbody>
              {Object.keys(this.cartMap).map((item) => (
                  <tr key={key}>
                    <th scope="row">{key++}</th>
                    <td>{item}</td>
                    <td>{this.cartMap[item].qty}</td>
                    <td>{this.cartMap[item].genieObject.price / 100}</td>
                    <td>
                      {(this.cartMap[item].genieObject.price / 100) *
                        this.cartMap[item].qty}
                    </td>
                    <td>
                      <div className="text-center">
                        <button className="btn-danger  btn-md" value ="addQty" onClick = {this.handleAdd}>+</button>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <button className="btn-danger btn-md" value = "lessQty" onClick = {this.handleSubtract}>-</button>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <button className="btn-danger btn-md"  onClick={() => this.handleDelete(item.id)}>X</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-center">
              <span className="text-primary"> Total Amount Due: </span>
              {cart.reduce((acc, currentVal) => acc + currentVal.price / 100, 0)}
            </div>
            <div className="text-center">
              <button className="btn-danger btn-md">Checkout</button>
            </div>
            <div></div>
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
    deleteGenie:(id) =>dispatch(deleteGenie(id)),
    addQty:(genie)=> dispatch(addGenieToOrder(genie)),
    lessQty:(genie) => dispatch(editQuantity(genie))
  };
};

export default connect(mapState, mapDispatch)(Orders);
