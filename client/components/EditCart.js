import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCart, updateCart } from "../store/cart"

class EditCart extends Component {
  constructor(props) {
    console.log('props', props);
    super(props);
    this.state = {
     edit:false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }


  handleAdd(genieId,currQty, genie) {
    this.props.updatedQty(genieId,1, genie)
  }

  handleSubtract(genieId,currQty, genie) {
    this.props.updatedQty(genieId,-1, genie)
  }

  async handleDelete(id) {
    await this.props.deleteFromCard(id);
    this.props.getCart();
  }

  render() {
    return (
      <div className = 'cart'>
        {cart.genies && cart.genies.map((genie) => (
          <div className = 'cart-item' key = {genie.Id || genie.genieId}>
            <div>{genie.name}</div>
            <h3>{genie.price}</h3>
            <div>Remove Item</div>
              {this.state.edit && genie.orderline?quantity>0 && (<button type = "button" onClick ={()=> this.handleSubtract(genie.id,1,genie)}></button>
              )}

            <div>Add Item  </div>
             {this.state.edit && genie.orderline?quantity>0 && (<button type = "button" onClick ={()=> this.handleAdd(genie.id,1,genie)}></button>
            )}
            }

        ))}
          </div>
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
  updatedQty: (genieId, currQty, genie) =>
  dispatch(updateCart(genieId, currQty, genie)),
  deleteFromCart:(id) => dispatch(deleteCart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCart);