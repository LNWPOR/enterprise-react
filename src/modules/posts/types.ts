export type Post = {
  id: string;
  title: string;
  body: string;
};

export type PostState = {
  isLoading: boolean;
  items: Post[];
};

export enum PostActionTypes {
  LOAD_POSTS_REQUEST = 'app/posts/LOAD_POSTS_REQUEST',
  LOAD_POSTS_SUCCESS = 'app/posts/LOAD_POSTS_SUCCESS',
  LOAD_POSTS_FAILURE = 'app/posts/LOAD_POSTS_FAILURE',
  LOAD_POST_REQUEST = 'app/posts/LOAD_POST_REQUEST',
  LOAD_POST_SUCCESS = 'app/posts/LOAD_POST_SUCCESS',
  LOAD_POST_FAILURE = 'app/posts/LOAD_POST_FAILURE',
}

export type PostsRequestAction = {
  type: PostActionTypes.LOAD_POSTS_REQUEST;
};

export type PostsSuccessAction = {
  type: PostActionTypes.LOAD_POSTS_SUCCESS;
  payload: {
    posts: Post[];
  };
};

export type PostsFailureAction = {
  type: PostActionTypes.LOAD_POSTS_FAILURE;
  payload: {
    message: string;
  };
};

export type PostRequestAction = {
  type: PostActionTypes.LOAD_POST_REQUEST;
};

export type PostSuccessAction = {
  type: PostActionTypes.LOAD_POST_SUCCESS;
  payload: {
    posts: Post[];
  };
};

export type PostFailureAction = {
  type: PostActionTypes.LOAD_POST_FAILURE;
  payload: {
    message: string;
  };
};

export type PostActions =
  | PostsRequestAction
  | PostsSuccessAction
  | PostsFailureAction
  | PostRequestAction
  | PostSuccessAction
  | PostFailureAction;
