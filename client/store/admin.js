import axios from 'axios'
const initialState = []

/**
 * ACTION TYPES
 */
export const FETCH_USERS = "FETCH_USERS"

/**
 * ACTION CREATORS
 */
export const _fetchUsers = (users) => {
  return {
    type: FETCH_USERS,
    users
  }
}

/**
 * THUNK CREATORS
 */

export const fetchUsers = () => {
  const token = window.localStorage.getItem('token')
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/admin", {
        headers: {
          authorization: token
        }
      })
      dispatch(_fetchUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.users
    default:
      return state
  }
}
