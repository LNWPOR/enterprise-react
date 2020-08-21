export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserState = {
  isLoading: boolean;
  items: User[];
};

export enum UserActionTypes {
  LOAD_USERS_REQUEST = 'app/users/LOAD_USERS_REQUEST',
  LOAD_USERS_SUCCESS = 'app/users/LOAD_USERS_SUCCESS',
  LOAD_USERS_FAILURE = 'app/users/LOAD_USERS_FAILURE',
}

export type UsersRequestAction = {
  type: UserActionTypes.LOAD_USERS_REQUEST;
};

export type UsersSuccessAction = {
  type: UserActionTypes.LOAD_USERS_SUCCESS;
  payload: {
    users: User[];
  };
};

export type UsersFailureAction = {
  type: UserActionTypes.LOAD_USERS_FAILURE;
  payload: {
    message: string;
  };
};

export type UserActions =
  | UsersRequestAction
  | UsersSuccessAction
  | UsersFailureAction;
