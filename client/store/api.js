import axios from 'axios'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_ADMIN = 'SET_ADMIN'

/**
 * ACTION CREATORS
 */
const setAdmin = admin => ({type: SET_ADMIN, admin})

/**
 * THUNK CREATORS
 */
export const admin = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/api/admin', {
      headers: {
        authorization: token //essentially add this to every thunk route that we want hidden behind an authorization
      }
    })
    return dispatch(setAdmin(res.data))
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_ADMIN:
      return action.admin
    default:
      return state
  }
}
