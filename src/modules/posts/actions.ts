import axios from 'axios';

import { AppThunk } from 'modules/actions';
import {
  PostRequestAction,
  PostSuccessAction,
  PostFailureAction,
  PostActionTypes,
  Post,
} from './types';

const loadPostsRequest = (): PostRequestAction => ({
  type: PostActionTypes.LOAD_POSTS_REQUEST,
});

const loadPostsSuccess = (posts: Post[]): PostSuccessAction => ({
  type: PostActionTypes.LOAD_POSTS_SUCCESS,
  payload: {
    posts,
  },
});

const loadPostsFailure = (message: string): PostFailureAction => ({
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
