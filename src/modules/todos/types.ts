export type Todo = {
  id: string;
  title: string;
};

export type TodoState = {
  isLoading: boolean;
  items: Todo[];
};

export enum TodoActionTypes {
  LOAD_TODOS_REQUEST = 'app/todos/LOAD_TODOS_REQUEST',
  LOAD_TODOS_SUCCESS = 'app/todos/LOAD_TODOS_SUCCESS',
  LOAD_TODOS_FAILURE = 'app/todos/LOAD_TODOS_FAILURE',
}

export type TodosRequestAction = {
  type: TodoActionTypes.LOAD_TODOS_REQUEST;
};

export type TodosSuccessAction = {
  type: TodoActionTypes.LOAD_TODOS_SUCCESS;
  payload: {
    todos: Todo[];
  };
};

export type TodosFailureAction = {
  type: TodoActionTypes.LOAD_TODOS_FAILURE;
  payload: {
    message: string;
  };
};

export type TodoActions =
  | TodosRequestAction
  | TodosSuccessAction
  | TodosFailureAction;
