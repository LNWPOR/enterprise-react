import {
  LOAD_CATEGORIES_REQUEST,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
  LOAD_CATEGORY_REQUEST,
  LOAD_CATEGORY_SUCCESS,
  LOAD_CATEGORY_FAILURE,
  DELETE_CATEGORY_SUCCESS,
} from './actions'

const initialState = {
  isLoading: false,
  items: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES_REQUEST:
    case LOAD_CATEGORY_REQUEST:
      return { ...state, isLoading: true, items: [] }
    case LOAD_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, items: action.payload.categories }
    case LOAD_CATEGORY_SUCCESS:
      return { ...state, isLoading: false, items: [action.payload.category] }
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: state.items.filter((item) => item.id !== action.payload.id),
      }
    case LOAD_CATEGORIES_FAILURE:
    case LOAD_CATEGORY_FAILURE:
      return { ...state, isLoading: false, items: [], paging: null }
    default:
      return state
  }
}
