import axios from "axios";
import history from "../history";

//Actions for Adding/editing , deleting product and clearing cart after done
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_QUANTIY = "DELETE_QUANTIY";
const CLEAR_CART = "CLEAR_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
//Token for authorisation as user can only edit their cart
const TOKEN = "TOKEN";

//Action creators for Adding/editing , deleting product and clearing
const addToCart = (product) => ({
  type: ADD_TO_CART,
  product
})
const deleteQuantity = (item) => {
  return {
    type: DELETE_QUANTIY,
    item,
  };
};
const deleteFromCart = (genie) => {
  return {
    type: REMOVE_FROM_CART,
    genie,
  };
};

const clearCart = (cart) => {
  return {
    type: CLEAR_CART,
    cart,
  };
};
const getCart = (cart) => ({
  type: GET_CART,
  cart
})

//Thunk Creators
// export const updateCart = (genieId, userId,history) => async (dispatch) => {
//   try {
//     const {data} = await axios.delete(`/api/orders/${userId}/${genieId}`)
//     dispatch(deleteFromCart(data));
//     history.push('/')
//   } catch (error) {
//     console.error(error);
//   }
// };



// export const clearedCart = () => async (dispatch) => {
//   try {
//     const token = window.localStorage.getItem(TOKEN);
//     if (token) {
//       await axios.put(`/api/cart/purchased`, {
//         headers: {
//           authorization: token,
//         },
//       });
//     }
//     dispatch(
//       clearCart({
//         order: {},
//         genies: [],
//       })
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

export const deleteCart = (id) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    await axios.delete(`/api/orders/genie/$id`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(deleteFromCart(id));
  } catch (error) {
    console.error(error);
  }
};
export const fetchCart = (userId) => {
  return async (dispatch) => {
      try {
        const { data } = await axios.get(`/api/cart/${userId}`)
        dispatch(getCart(data))
      } catch (err) {
          console.error(err)
      }
  }
}

export const removeQuantity = (genieObj,history)=> {
  return async(dispatch) => {
    try {
      const userId = {
        id: genieObj[0]
      }
      const qty = {
        type: genieObj[2]
      }
      const {data} = await axios.post(`/api/orders/`, [userId, genieObj[1],qty])
      dispatch(deleteQuantity(data));
      history.push(`/`)
    } catch (error) {
      console.log(error);
    }
  }
}


export default function cartReducer(state =  [] , action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state,action.genie]
    case DELETE_QUANTIY:
    if(state.length !== 0)
      return state.genies.map((genie) => {
        if (genie.orderGenie.genieId === action.genie.id && genie.orderGenie >1) {
          genie.orderGenie.quantity = action.orderGenie.quantity;
        }return genie;
      })
    case REMOVE_FROM_CART:
      const updatedCart = state.genies.filter((genie)=>{
        return genie.orderGenie.genieId !== action.genieId
      });
      const newState = {...state}
      newState.genies = updatedCart;
       return newState
    case CLEAR_CART:
    return action.cart;
  default:
    return state;
  }

}
