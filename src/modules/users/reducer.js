import {
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  DELETE_USER_SUCCESS,
} from './actions'

const initialState = {
  isLoading: false,
  items: [],
  paging: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS_REQUEST:
    case LOAD_USER_REQUEST:
      return { ...state, isLoading: true, items: [] }
    case LOAD_USERS_SUCCESS:
      return { ...state, isLoading: false, ...action.payload }
    case LOAD_USER_SUCCESS:
      return { ...state, isLoading: false, items: [action.payload.user] }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: state.items.filter((item) => item.id !== action.payload.id),
      }
    case LOAD_USERS_FAILURE:
    case LOAD_USER_FAILURE:
      return { ...state, isLoading: false, items: [], paging: null }
    default:
      return state
  }
}
