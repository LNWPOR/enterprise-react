import axios from 'axios'
import { push } from 'connected-react-router'

const LOAD_CATEGORIES_REQUEST = 'app/categories/LOAD_CATEGORIES_REQUEST'
const LOAD_CATEGORIES_SUCCESS = 'app/categories/LOAD_CATEGORIES_SUCCESS'
const LOAD_CATEGORIES_FAILURE = 'app/categories/LOAD_CATEGORIES_FAILURE'
const LOAD_CATEGORY_REQUEST = 'app/categories/LOAD_CATEGORY_REQUEST'
const LOAD_CATEGORY_SUCCESS = 'app/categories/LOAD_CATEGORY_SUCCESS'
const LOAD_CATEGORY_FAILURE = 'app/categories/LOAD_CATEGORY_FAILURE'
const CREATE_CATEGORY_REQUEST = 'app/categories/CREATE_CATEGORY_REQUEST'
const CREATE_CATEGORY_SUCCESS = 'app/categories/CREATE_CATEGORY_SUCCESS'
const CREATE_CATEGORY_FAILURE = 'app/categories/CREATE_CATEGORY_FAILURE'
const UPDATE_CATEGORY_REQUEST = 'app/categories/UPDATE_CATEGORY_REQUEST'
const UPDATE_CATEGORY_SUCCESS = 'app/categories/UPDATE_CATEGORY_SUCCESS'
const UPDATE_CATEGORY_FAILURE = 'app/categories/UPDATE_CATEGORY_FAILURE'
const DELETE_CATEGORY_REQUEST = 'app/categories/DELETE_CATEGORY_REQUEST'
const DELETE_CATEGORY_SUCCESS = 'app/categories/DELETE_CATEGORY_SUCCESS'
const DELETE_CATEGORY_FAILURE = 'app/categories/DELETE_CATEGORY_FAILURE'

function loadCategories() {
  return async (dispatch) => {
    dispatch({ type: LOAD_CATEGORIES_REQUEST })

    try {
      const {
        data: { categories },
      } = await axios.get('/categories')

      dispatch({ type: LOAD_CATEGORIES_SUCCESS, payload: { categories } })
    } catch (error) {
      dispatch({ type: LOAD_CATEGORIES_FAILURE })
    }
  }
}

function loadCategory(id) {
  return async (dispatch) => {
    dispatch({ type: LOAD_CATEGORY_REQUEST })

    try {
      const {
        data: { category },
      } = await axios.get(`/categories/${id}`)

      dispatch({ type: LOAD_CATEGORY_SUCCESS, payload: { category } })
    } catch (err) {
      dispatch({ type: LOAD_CATEGORY_FAILURE })
    }
  }
}

function createCategory(category) {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST })

    try {
      await axios.post('/categories', category)

      dispatch({ type: CREATE_CATEGORY_SUCCESS })
      dispatch(push('/admin/categories'))
    } catch (err) {
      dispatch({ type: CREATE_CATEGORY_FAILURE })
    }
  }
}

function updateCategory(id, category) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST })

    try {
      await axios.patch(`/categories/${id}`, category)

      dispatch({ type: UPDATE_CATEGORY_SUCCESS })
      dispatch(push(`/admin/categories/${id}`))
    } catch (err) {
      dispatch({ type: UPDATE_CATEGORY_FAILURE })
    }
  }
}

function deleteCategory(id) {
  return async (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_REQUEST })

    try {
      await axios.delete(`/categories/${id}`)

      dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: { id } })
    } catch (err) {
      dispatch({ type: DELETE_CATEGORY_FAILURE })
    }
  }
}

export {
  LOAD_CATEGORIES_REQUEST,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
  LOAD_CATEGORY_REQUEST,
  LOAD_CATEGORY_SUCCESS,
  LOAD_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  loadCategories,
  loadCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}
