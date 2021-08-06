import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCart, updateCart,addToCart } from "../store/cart"
import CartContainer from "./CartContainer";

class Cart extends Component {
  constructor(props) {
    console.log('props', props);
    super(props);
    this.state = {
     cart:[]
    };
    this.handleAdd =this.handleAdd.bind(this)
    this.handleSubtract = this.handleSubtract(this)
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    const guestCart = JSON.parse(localStorage.getItem('guestCart'))
    this.setState({cart: guestCart})
    if((this.props.match.params.userId)>0) {
      this.props.getCart(this.props.match.params.userId)
    }

  }
 componentDidUpdate(prevProps) {
   if(prevProps.userId !== thi.props.userId) {
     this.props.getCart(this.props.userId)
   }
 }
  handleAdd(evt, genie) {
    this.setState(state => {
      const genies= this.state.genies
      const genieInCart = false;
      genies.forEach(item => {
        if(item.id === genie.id) {
          genieInCart = true;
          item.inventory++
        }
      })
      if(!genieInCart) {
        genieInCart.push({...genies,inventory:1})
      }
       localStorage.setItem('guestCart', JSON.stringify(prevCart))

    })
  }


  // handleSubtract(evt) {
  //   evt.persist();
  //     const { data} =  axios.get(`api/genies/${evt.target.id}`)
  //     this.props.decrement([this.props.cart.userId,data,qtyType])

  //     let prevCart = JSON.parse(localStorage.getItem('guestCart'));
  //     let truthy;
  //     let id = evt.target.id
  //     if(!prevCart) {
  //       prevCart = [];
  //       localStorage.setItem('guestCart', JSON.stringify(prevCart))
  //     }else {
  //       prevCart.map(genie => {
  //         if(genie.id === id) {
  //           genie.inventory--;
  //         }
  //       })
  //     }

  //   }



   handleDelete(evt,genie) {

    this.setState(state => {
      let updatedCart = state.genies.filter(ele => ele.id !== genie.id);
    localStorage.setItem('guestCart', updatedCart);
    return {updatedCart}
  })
}

  render() {
    return (
      <div className = 'cart'>


         {/* ADD products should come here */} handleAdd = {this.handleAdd}
            <CartContainer  genies = {this.state.genies} handleSubtract = {this.handleSubtract}/>
            <h3>{genie.price}</h3>
            <div>Remove Item</div>
              {this.state.edit && genie.orderline0 && (<button type = "button" onClick ={()=> this.handleSubtract(genie.id,1,genie)}></button>
              )}

            <div>Add Item  </div>
             {this.state.edit && genie.orderline?quantity>0 && (<button type = "button" onClick ={()=> this.handleAdd(genie.id,1,genie)}></button>
            )}


        )}

    </div>
    )

  }

}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch, { history }) => ({
  addToCart:(genieId) => dispatch(addToCart(genieId)),
  updatedQty: (genieId, currQty, genie) =>
  dispatch(updateCart(genieId, currQty, genie)),
  deleteFromCart:(id) => dispatch(deleteCart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);