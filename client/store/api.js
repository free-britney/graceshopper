import axios from 'axios'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_API = 'SET_API'

/**
 * ACTION CREATORS
 */
const setApi = api => ({type: SET_API, api})

/**
 * THUNK CREATORS
 */
export const api = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/api/users', {
      headers: {
        authorization: token //essentially add this to every thunk route that we want hidden behind an authorization
      }
    })
    return dispatch(setApi(res.data))
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_API:
      return action.api
    default:
      return state
  }
}
