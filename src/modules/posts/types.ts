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
}

export type PostRequestAction = {
  type: PostActionTypes.LOAD_POSTS_REQUEST;
};

export type PostSuccessAction = {
  type: PostActionTypes.LOAD_POSTS_SUCCESS;
  payload: {
    posts: Post[];
  };
};

export type PostFailureAction = {
  type: PostActionTypes.LOAD_POSTS_FAILURE;
  payload: {
    message: string;
  };
};

export type PostActions =
  | PostRequestAction
  | PostSuccessAction
  | PostFailureAction;
