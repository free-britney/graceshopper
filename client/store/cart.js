import axios from "axios";
const initialState = {};

//action type
const ADD_GENIE_TO_ORDER = "ADD_GENIE_TO_ORDER";
const GET_ORDER = "GET_ORDER";
const DELETE_QUANTIY = "DELETE_QUANTIY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const TOKEN = "token";

//action creator
export const addGenieToOrder = (genie) => {
  return {
    type: ADD_GENIE_TO_ORDER,
    genie,
  };
};

export const getOrder = (order) => {
  return {
    type: GET_ORDER,
    order,
  };
};
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

//thunk creators
//add to cart
export const addToOrder = (genieId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/orders", { genieId });
      dispatch(addGenieToOrder(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//retrieve order in cart
export const fetchOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/orders", { orderId });
      dispatch(getOrder(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteGenie = (id) => {
  return async (dispatch) => {
    try {
      const {data: genie} = await axios.delete(`/api/genies/${id}`)
      dispatch(deleteFromCart(genie));
    } catch (error) {
      console.error(error);
    }
  };
}
export const editQuantity = (genieObj,history)=> {
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


//reducer
export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_GENIE_TO_ORDER:
      return [...state, action.genies]
    case GET_ORDER:
      return action.order;
    // case DELETE_QUANTIY:
    //     if(state.length !== 0)
    //       return state.genies.map((genie) => {
    //         if (genie.id === action.genie.id && genie.wishQty>1) {
    //           genie.wishQty = genie.wishQty-1;
    //           return genie;
    //         }return genie;
    //       });
    case REMOVE_FROM_CART:
      return state.filter((genie)=> genie.id !== action.genie.id)


    default:
      return state;
  }
}
