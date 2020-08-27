import axios from 'axios'
import { push } from 'connected-react-router'

const LOAD_USERS_REQUEST = 'app/users/LOAD_USERS_REQUEST'
const LOAD_USERS_SUCCESS = 'app/users/LOAD_USERS_SUCCESS'
const LOAD_USERS_FAILURE = 'app/users/LOAD_USERS_FAILURE'
const LOAD_USER_REQUEST = 'app/users/LOAD_USER_REQUEST'
const LOAD_USER_SUCCESS = 'app/users/LOAD_USER_SUCCESS'
const LOAD_USER_FAILURE = 'app/users/LOAD_USER_FAILURE'
const CREATE_USER_REQUEST = 'app/users/CREATE_USER_REQUEST'
const CREATE_USER_SUCCESS = 'app/users/CREATE_USER_SUCCESS'
const CREATE_USER_FAILURE = 'app/users/CREATE_USER_FAILURE'
const UPDATE_USER_REQUEST = 'app/users/UPDATE_USER_REQUEST'
const UPDATE_USER_SUCCESS = 'app/users/UPDATE_USER_SUCCESS'
const UPDATE_USER_FAILURE = 'app/users/UPDATE_USER_FAILURE'
const DELETE_USER_REQUEST = 'app/users/DELETE_USER_REQUEST'
const DELETE_USER_SUCCESS = 'app/users/DELETE_USER_SUCCESS'
const DELETE_USER_FAILURE = 'app/users/DELETE_USER_FAILURE'

function loadUsers(query) {
  return async (dispatch) => {
    dispatch({ type: LOAD_USERS_REQUEST })

    try {
      const {
        data: { users },
      } = await axios.get(`/users${query}`)

      dispatch({
        type: LOAD_USERS_SUCCESS,
        payload: users,
      })
    } catch (err) {
      dispatch({ type: LOAD_USERS_FAILURE })
    }
  }
}

function loadUser(id) {
  return async (dispatch) => {
    dispatch({ type: LOAD_USER_REQUEST })

    try {
      const {
        data: { user },
      } = await axios.get(`/users/${id}`)

      dispatch({ type: LOAD_USER_SUCCESS, payload: { user } })
    } catch (err) {
      dispatch({ type: LOAD_USER_FAILURE })
    }
  }
}

function createUser(user) {
  return async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST })

    try {
      const formData = new FormData()

      for (const field in user) formData.append(field, user[field])

      await axios.post('/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      dispatch({ type: CREATE_USER_SUCCESS })
      dispatch(push('/admin/users'))
    } catch (err) {
      dispatch({ type: CREATE_USER_FAILURE })
    }
  }
}

function updateUser(id, user) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST })

    try {
      const formData = new FormData()

      for (const field in user) formData.append(field, user[field])

      await axios.patch(`/users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      dispatch({ type: UPDATE_USER_SUCCESS })
      dispatch(push(`/admin/users/${id}`))
    } catch (err) {
      dispatch({ type: UPDATE_USER_FAILURE })
    }
  }
}

function deleteUser(id) {
  return async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST })

    try {
      await axios.delete(`/users/${id}`)

      dispatch({ type: DELETE_USER_SUCCESS, payload: { id } })
    } catch (err) {
      dispatch({ type: DELETE_USER_FAILURE })
    }
  }
}

export {
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  loadUsers,
  loadUser,
  createUser,
  updateUser,
  deleteUser,
}
