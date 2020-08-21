import axios from 'axios';

import { AppThunk } from 'modules/actions';
import {
  TodosRequestAction,
  TodosSuccessAction,
  TodosFailureAction,
  TodoActionTypes,
  Todo,
} from './types';

const loadTodosRequest = (): TodosRequestAction => ({
  type: TodoActionTypes.LOAD_TODOS_REQUEST,
});

const loadTodosSuccess = (todos: Todo[]): TodosSuccessAction => ({
  type: TodoActionTypes.LOAD_TODOS_SUCCESS,
  payload: {
    todos,
  },
});

const loadTodosFailure = (message: string): TodosFailureAction => ({
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
