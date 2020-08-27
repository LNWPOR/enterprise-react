import axios from 'axios'
import { push } from 'connected-react-router'

const LOAD_TOKEN = 'app/auth/LOAD_TOKEN'
const LOAD_PROFILE_REQUEST = 'app/auth/LOAD_PROFILE_REQUEST'
const LOAD_PROFILE_SUCCESS = 'app/auth/LOAD_PROFILE_SUCCESS'
const LOAD_PROFILE_FAILURE = 'app/auth/LOAD_PROFILE_FAILURE'
const UPDATE_PROFILE_REQUEST = 'app/auth/UPDATE_PROFILE_REQUEST'
const UPDATE_PROFILE_SUCCESS = 'app/auth/UPDATE_PROFILE_SUCCESS'
const UPDATE_PROFILE_FAILURE = 'app/auth/UPDATE_PROFILE_FAILURE'
const SIGNUP_REQUEST = 'app/auth/SIGNUP_REQUEST'
const SIGNUP_SUCCESS = 'app/auth/SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'app/auth/SIGNUP_FAILURE'
const SIGNIN_REQUEST = 'app/auth/SIGNIN_REQUEST'
const SIGNIN_SUCCESS = 'app/auth/SIGNIN_SUCCESS'
const SIGNIN_FAILURE = 'app/auth/SIGNIN_FAILURE'
const LOGOUT = 'app/auth/LOGOUT'

function storeToken(token) {
  if (token) {
    localStorage.setItem('accessToken', token)
  } else {
    localStorage.removeItem('accessToken')
  }
}

function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

function loadToken() {
  const token = localStorage.getItem('accessToken')

  setTokenHeader(token)

  return {
    type: LOAD_TOKEN,
    payload: { token },
  }
}

function loadProfile() {
  return async (dispatch) => {
    dispatch({ type: LOAD_PROFILE_REQUEST })

    try {
      const {
        data: { user },
      } = await axios.get('/auth/profile')

      dispatch({ type: LOAD_PROFILE_SUCCESS, payload: { user } })
    } catch (error) {
      dispatch({ type: LOAD_PROFILE_FAILURE })
    }
  }
}

function updateProfile(profile) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST })

    try {
      const formData = new FormData()

      for (const key in profile) formData.append(key, profile[key])

      const {
        data: { user },
      } = await axios.patch('/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: { user } })
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_FAILURE })
    }
  }
}

function signup(credential) {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST })

    try {
      await axios.post('/auth/sign-up', credential)

      dispatch({ type: SIGNUP_SUCCESS })
      dispatch(push('/'))
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE })
    }
  }
}

function signin(credential) {
  return async (dispatch) => {
    dispatch({ type: SIGNIN_REQUEST })

    try {
      const {
        data: { token },
      } = await axios.post('/auth/sign-in', credential)

      dispatch({ type: SIGNIN_SUCCESS, payload: { accessToken: token } })
      storeToken(token)
      setTokenHeader(token)
      dispatch(push('/'))
    } catch (error) {
      dispatch({ type: SIGNIN_FAILURE })
    }
  }
}

function logout() {
  storeToken(null)
  setTokenHeader(null)

  return {
    type: LOGOUT,
  }
}

export {
  LOAD_TOKEN,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
  loadToken,
  signup,
  signin,
  loadProfile,
  updateProfile,
  logout,
}
