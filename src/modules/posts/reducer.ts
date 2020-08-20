import { PostState, PostActionTypes } from './types';
import { RootActions } from 'modules/actions';

const initialState: PostState = {
  isLoading: false,
  items: [],
};

export default (
  state: PostState = initialState,
  action: RootActions
): PostState => {
  switch (action.type) {
    case PostActionTypes.LOAD_POSTS_REQUEST:
      return { ...state, isLoading: true };
    case PostActionTypes.LOAD_POSTS_SUCCESS:
      return { ...state, items: action.payload.posts, isLoading: false };
    case PostActionTypes.LOAD_POSTS_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
