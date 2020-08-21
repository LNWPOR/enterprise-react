import { RootState } from 'modules/reducers';
import { PostState, Post } from './types';

export const getPosts = (state: RootState): PostState => state.posts;

export const getPost = (id: Post['id']) => (
  state: RootState
): Post | undefined => {
  return getPosts(state).items.find((post) => post.id === id);
};
