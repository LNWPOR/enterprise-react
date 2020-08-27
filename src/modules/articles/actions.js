import axios from 'axios'
import { push } from 'connected-react-router'

const LOAD_ARTICLES_REQUEST = 'app/articles/LOAD_ARTICLES_REQUEST'
const LOAD_ARTICLES_SUCCESS = 'app/articles/LOAD_ARTICLES_SUCCESS'
const LOAD_ARTICLES_FAILURE = 'app/articles/LOAD_ARTICLES_FAILURE'
const LOAD_ARTICLE_REQUEST = 'app/articles/LOAD_ARTICLE_REQUEST'
const LOAD_ARTICLE_SUCCESS = 'app/articles/LOAD_ARTICLE_SUCCESS'
const LOAD_ARTICLE_FAILURE = 'app/articles/LOAD_ARTICLE_FAILURE'
const CREATE_ARTICLE_REQUEST = 'app/articles/CREATE_ARTICLE_REQUEST'
const CREATE_ARTICLE_SUCCESS = 'app/articles/CREATE_ARTICLE_SUCCESS'
const CREATE_ARTICLE_FAILURE = 'app/articles/CREATE_ARTICLE_FAILURE'
const UPDATE_ARTICLE_REQUEST = 'app/articles/UPDATE_ARTICLE_REQUEST'
const UPDATE_ARTICLE_SUCCESS = 'app/articles/UPDATE_ARTICLE_SUCCESS'
const UPDATE_ARTICLE_FAILURE = 'app/articles/UPDATE_ARTICLE_FAILURE'
const DELETE_ARTICLE_REQUEST = 'app/articles/DELETE_ARTICLE_REQUEST'
const DELETE_ARTICLE_SUCCESS = 'app/articles/DELETE_ARTICLE_SUCCESS'
const DELETE_ARTICLE_FAILURE = 'app/articles/DELETE_ARTICLE_FAILURE'

function loadArticles(query) {
  return async (dispatch) => {
    dispatch({ type: LOAD_ARTICLES_REQUEST })

    try {
      const {
        data: { articles },
      } = await axios.get(`/articles${query}`)

      dispatch({
        type: LOAD_ARTICLES_SUCCESS,
        payload: articles,
      })
    } catch (err) {
      dispatch({ type: LOAD_ARTICLES_FAILURE })
    }
  }
}

function loadArticle(id) {
  return async (dispatch) => {
    dispatch({ type: LOAD_ARTICLE_REQUEST })

    try {
      const {
        data: { article },
      } = await axios.get(`/articles/${id}`)

      dispatch({ type: LOAD_ARTICLE_SUCCESS, payload: { article } })
    } catch (err) {
      dispatch({ type: LOAD_ARTICLE_FAILURE })
    }
  }
}

function createArticle(article) {
  return async (dispatch) => {
    dispatch({ type: CREATE_ARTICLE_REQUEST })

    try {
      const formData = new FormData()

      for (const field in article) formData.append(field, article[field])

      await axios.post('/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      dispatch({ type: CREATE_ARTICLE_SUCCESS })
      dispatch(push('/admin/articles'))
    } catch (err) {
      dispatch({ type: CREATE_ARTICLE_FAILURE })
    }
  }
}

function updateArticle(id, article) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ARTICLE_REQUEST })

    try {
      const formData = new FormData()

      for (const field in article) formData.append(field, article[field])

      await axios.patch(`/articles/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      dispatch({ type: UPDATE_ARTICLE_SUCCESS })
      dispatch(push(`/admin/articles/${id}`))
    } catch (err) {
      dispatch({ type: UPDATE_ARTICLE_FAILURE })
    }
  }
}

function deleteArticle(id) {
  return async (dispatch) => {
    dispatch({ type: DELETE_ARTICLE_REQUEST })

    try {
      await axios.delete(`/articles/${id}`)

      dispatch({ type: DELETE_ARTICLE_SUCCESS, payload: { id } })
    } catch (err) {
      dispatch({ type: DELETE_ARTICLE_FAILURE })
    }
  }
}

export {
  LOAD_ARTICLES_REQUEST,
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLES_FAILURE,
  LOAD_ARTICLE_REQUEST,
  LOAD_ARTICLE_SUCCESS,
  LOAD_ARTICLE_FAILURE,
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAILURE,
  DELETE_ARTICLE_REQUEST,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  loadArticles,
  loadArticle,
  createArticle,
  updateArticle,
  deleteArticle,
}
