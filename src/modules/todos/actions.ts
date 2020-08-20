import axios from 'axios';

import { AppThunk } from 'modules/actions';
import {
  TodoRequestAction,
  TodoSuccessAction,
  TodoFailureAction,
  TodoActionTypes,
  Todo,
} from './types';

const loadTodosRequest = (): TodoRequestAction => ({
  type: TodoActionTypes.LOAD_TODOS_REQUEST,
});

const loadTodosSuccess = (todos: Todo[]): TodoSuccessAction => ({
  type: TodoActionTypes.LOAD_TODOS_SUCCESS,
  payload: {
    todos,
  },
});

const loadTodosFailure = (message: string): TodoFailureAction => ({
  type: TodoActionTypes.LOAD_TODOS_FAILURE,
  payload: {
    message,
  },
});

export const loadTodos = (): AppThunk => async (dispatch) => {
  dispatch(loadTodosRequest());

  try {
    const res = await axios.get('/todos');

    dispatch(loadTodosSuccess(res.data));
  } catch (ex) {
    dispatch(loadTodosFailure(ex.message));
  }
};
