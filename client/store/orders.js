import axios from "axios";
const initialState = {};

//action type
const ADD_GENIE_TO_ORDER = "ADD_GENIE_TO_ORDER";
const GET_ORDER = "GET_ORDER";
const EDIT_ORDER = "EDIT_ORDER";

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

export const _editOrder = (order) => { 
  return {
    type: EDIT_ORDER,
    order,
  }
}

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

//edit order
export const editOrder = (userId) => {
  return async (dispatch) => {
    try{
      const { data } = await axios.put("/api/orders", { userId });
      dispatch(_editOrder(data));
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_GENIE_TO_ORDER:
      return action.genie;
    case GET_ORDER:
      return action.order;
    case EDIT_ORDER:
      return action.order;
    default:
      return state;
  }
}
