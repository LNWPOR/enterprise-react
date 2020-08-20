import { TodoState, TodoActionTypes } from './types';
import { RootActions } from 'modules/actions';

const initialState: TodoState = {
  isLoading: false,
  items: [],
};

export default (
  state: TodoState = initialState,
  action: RootActions
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.LOAD_TODOS_REQUEST:
      return { ...state, isLoading: true };
    case TodoActionTypes.LOAD_TODOS_SUCCESS:
      return { ...state, items: action.payload.todos, isLoading: false };
    case TodoActionTypes.LOAD_TODOS_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
