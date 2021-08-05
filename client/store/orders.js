import axios from 'axios';

const initialState = [];

const ADD_GENIE_TO_ORDER = "ADD_GENIE_TO_ORDER";
// users/2/cart - make a route 
// cart for user id 


export const addGenieToOrder = (genie) => {
    return {
      type: ADD_GENIE_TO_ORDER,
      genie,
    };
  };


export const addToOrder = (genieId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/api/orders', genieId);
      console.log("this is the data!" , data);
      dispatch(addGenieToOrder(data));
    } catch (err) {
      console.log(err);
    }
  }
}

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_GENIE_TO_ORDER:
        return [...state, action.genie];
      default:
        return state;
    }
  }
  