import axios from 'axios';

import { AppThunk } from 'modules/actions';
import {
  UsersRequestAction,
  UsersSuccessAction,
  UsersFailureAction,
  UserActionTypes,
  User,
} from './types';

const loadUsersRequest = (): UsersRequestAction => ({
  type: UserActionTypes.LOAD_USERS_REQUEST,
});

const loadUsersSuccess = (users: User[]): UsersSuccessAction => ({
  type: UserActionTypes.LOAD_USERS_SUCCESS,
  payload: {
    users,
  },
});

const loadUsersFailure = (message: string): UsersFailureAction => ({
  type: UserActionTypes.LOAD_USERS_FAILURE,
  payload: {
    message,
  },
});

export const loadUsers = (): AppThunk => async (dispatch) => {
  dispatch(loadUsersRequest());

  try {
    const res = await axios.get('/users');

    dispatch(loadUsersSuccess(res.data));
  } catch (ex) {
    dispatch(loadUsersFailure(ex.message));
  }
};
