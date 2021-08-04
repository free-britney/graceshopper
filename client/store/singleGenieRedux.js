import axios from 'axios';

const initialState = {};

/**
 * ACTION TYPES
 */
const SET_SINGLE_GENIE = 'SET_SINGLE_GENIE';

/**
 * ACTION CREATORS
 */
export const setSingleGenie = (genie) => {
  return {
    type: SET_SINGLE_GENIE,
    genie
  }
}

/**
 * THUNK CREATORS
 */
export const fetchSingleGenie = (genieId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/genies/${genieId}`);
      dispatch(setSingleGenie(data));
    } catch(err) {
      console.log(err);
    }
  }
}

/**
 * REDUCER
 */
export default function singleGenieReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_GENIE:
      return action.genie;
    default:
      return state;
  }
}
