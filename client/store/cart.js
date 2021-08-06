import axios from "axios";
import history from "../history";

//Actions for Adding/editing , deleting product and clearing cart after done
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const EDIT_CART = "EDIT_CART";
const CLEAR_CART = "CLEAR_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
//Token for authorisation as user can only edit their cart
const TOKEN = "TOKEN";

//Action creators for Adding/editing , deleting product and clearing
const addToCart = (product) => ({
  type: ADD_TO_CART,
  product
})
const editCart = (item) => {
  return {
    type: EDIT_CART,
    item,
  };
};
const deleteFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    id,
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
export const updateCart = (genieId, quantity) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data: updated } = await axios.put(
        `/api/cart/`,
        { genieId, quantity },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(editCart(updated));
    }
  } catch (error) {
    console.error(error);
  }
};

export const clearedCart = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      await axios.put(`/api/cart/purchased`, {
        headers: {
          authorization: token,
        },
      });
    }
    dispatch(
      clearCart({
        order: {},
        genies: [],
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const deleteCart = (id) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    await axios.delete(`/api/cart/genie/$id`, {
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


export default function cartReducer(state = { order: {}, genies: [] }, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state,action.genie]
    case EDIT_CART:
      return state.genies.map((genie) => {
        if (genie.id === action.item.genieId) {
          genie.order_items.quantity = action.item.quantity;
        }
        return genie;
      });
    case REMOVE_FROM_CART:
      return {
        ...state,
        genies: [...state.genies].filter(
          (genie) => genie.id !== action.genieId
        ),
      };
  case CLEAR_CART:
    return action.cart;
  default:
    return state;
  }

}
