import axios from "axios";
const initialState = {};

//action type
const ADD_GENIE_TO_ORDER = "ADD_GENIE_TO_ORDER";
const GET_ORDER = "GET_ORDER";

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

//thunk creators
//add to cart
export const addToOrder = (genieId, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put("/api/orders", { genieId, userId });
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

//reducer
export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_GENIE_TO_ORDER:
      return action.genie;
    case GET_ORDER:
      return {...state, order: action.order};
    default:
      return state;
  }
}
