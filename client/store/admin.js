import axios from 'axios'
const initialState = []

// const TOKEN = 'token'

/**
 * ACTION TYPES
 */
export const SET_ADMIN = 'SET_ADMIN'
export const FETCH_USERS = "FETCH_USERS"
/**
 * ACTION CREATORS
 */
export const setAdmin = (admin) => {
  return {
    type: SET_ADMIN,
    admin
  }
}
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
    case SET_ADMIN:
      return action.admin
    case FETCH_USERS:
      return action.users
    default:
      return state
  }
}
