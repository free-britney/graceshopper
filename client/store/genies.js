// AN Edit - Importing Axios (for Thunks)
import axios from "axios";

// AN Edit - Create Action Types
export const SET_GENIES = "SET_GENIES";

// AN Edit - Create Action Creators
// --------------------------------------------
// This is a function that will take in genies.
// It will return an object that sets action type to SET_GENIES.
// It has a key of genies and a value of all the genies passed in.
export const setGenies = (genies) => ({
  type: SET_GENIES,
  genies: genies,
});

// AN Edit - Create Thunk Creators
// --------------------------------------------
// Here is my thunk creator that will fetch all genies.
// It will return an async function that will take in dispatch.
// It will do an axios call and if successful, dispatch will deploy the setGenies function..
// With a parameter of the genies and the axios call retrieved.
export const fetchGenies = () => {
  return async (dispatch) => {
    try {
      const { data: genies } = await axios.get("/api/genies");
      dispatch(setGenies(genies));
    } catch (error) {
      console.log(error);
    }
  };
};

// AN Edit - Create Genies Reducer
// -------------------------------------------
// Create a genies reducer here.
// This will take in state (we will set default state initial state to an array since I'm expecting an array of objects).
// This will also take in an action object returned from the setGenies function.
// Based on that action, it will update state.
