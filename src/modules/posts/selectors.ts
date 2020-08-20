import { RootState } from 'modules/reducers';
import { PostState } from './types';

export const getPosts = (state: RootState): PostState => state.posts;
