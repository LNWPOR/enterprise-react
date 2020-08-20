import { RootState } from 'modules/reducers';
import { TodoState } from './types';

export const getTodos = (state: RootState): TodoState => state.todos;
