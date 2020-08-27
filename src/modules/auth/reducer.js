import {
  LOAD_TOKEN,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
} from './actions'

const initialState = {
  isLoading: false,
  isProfileLoaded: false,
  accessToken: null,
  user: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TOKEN:
      return {
        ...state,
        accessToken: action.payload.token,
      }
    case SIGNIN_REQUEST:
    case LOAD_PROFILE_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return { ...state, isLoading: true }
    case LOAD_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        isProfileLoaded: true,
      }
    case SIGNIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        isLoading: false,
      }
    case LOGOUT:
      return {
        ...state,
        accessToken: null,
        user: null,
      }
    case LOAD_PROFILE_FAILURE:
    case UPDATE_PROFILE_FAILURE:
      return { ...state, user: null, isLoading: false }
    case SIGNIN_FAILURE:
      return { ...state, accessToken: null, isLoading: false }
    default:
      return state
  }
}
