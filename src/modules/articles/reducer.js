import {
  LOAD_ARTICLES_REQUEST,
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLES_FAILURE,
  LOAD_ARTICLE_REQUEST,
  LOAD_ARTICLE_SUCCESS,
  LOAD_ARTICLE_FAILURE,
  DELETE_ARTICLE_SUCCESS,
} from './actions'

const initialState = {
  isLoading: false,
  items: [],
  paging: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTICLES_REQUEST:
    case LOAD_ARTICLE_REQUEST:
      return { ...state, isLoading: true, items: [] }
    case LOAD_ARTICLES_SUCCESS:
      return { ...state, isLoading: false, ...action.payload }
    case LOAD_ARTICLE_SUCCESS:
      return { ...state, isLoading: false, items: [action.payload.article] }
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: state.items.filter((item) => item.id !== action.payload.id),
      }
    case LOAD_ARTICLES_FAILURE:
    case LOAD_ARTICLE_FAILURE:
      return { ...state, isLoading: false, items: [], paging: null }
    default:
      return state
  }
}
