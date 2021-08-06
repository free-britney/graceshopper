import axios from 'axios';
const initialState = {}

//action type
const ADD_GENIE_TO_ORDER  = "ADD_GENIE_TO_ORDER"

//action creator
export const addGenieToOrder = (genie) => {
  return {
    type: ADD_GENIE_TO_ORDER,
    genie
  }
}

//thunk creator
export const addToOrder = (genieId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/orders", {genieId})
      dispatch(addGenieToOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_GENIE_TO_ORDER:
      return action.genie
    default:
      return state
  }
}
