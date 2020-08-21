import axios from 'axios';

import { AppThunk } from 'modules/actions';
import {
  PostsRequestAction,
  PostsSuccessAction,
  PostsFailureAction,
  PostRequestAction,
  PostSuccessAction,
  PostFailureAction,
  PostActionTypes,
  Post,
} from './types';

const loadPostsRequest = (): PostsRequestAction => ({
  type: PostActionTypes.LOAD_POSTS_REQUEST,
});

const loadPostsSuccess = (posts: Post[]): PostsSuccessAction => ({
  type: PostActionTypes.LOAD_POSTS_SUCCESS,
  payload: {
    posts,
  },
});

const loadPostsFailure = (message: string): PostsFailureAction => ({
  type: PostActionTypes.LOAD_POSTS_FAILURE,
  payload: {
    message,
  },
});

export const loadPosts = (): AppThunk => async (dispatch) => {
  dispatch(loadPostsRequest());

  try {
    const res = await axios.get('/posts');

    dispatch(loadPostsSuccess(res.data));
  } catch (ex) {
    dispatch(loadPostsFailure(ex.message));
  }
};

const loadPostRequest = (): PostRequestAction => ({
  type: PostActionTypes.LOAD_POST_REQUEST,
});

const loadPostSuccess = (posts: Post[]): PostSuccessAction => ({
  type: PostActionTypes.LOAD_POST_SUCCESS,
  payload: {
    posts,
  },
});

const loadPostFailure = (message: string): PostFailureAction => ({
  type: PostActionTypes.LOAD_POST_FAILURE,
  payload: {
    message,
  },
});

export const loadPost = (id: Post['id']): AppThunk => async (dispatch) => {
  dispatch(loadPostRequest());

  try {
    const res = await axios.get(`/posts/${id}`);

    dispatch(loadPostSuccess(res.data));
  } catch (ex) {
    dispatch(loadPostFailure(ex.message));
  }
};
