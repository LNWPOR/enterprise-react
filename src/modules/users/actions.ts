import axios from 'axios';

import { AppThunk } from 'modules/actions';
import {
  UserRequestAction,
  UserSuccessAction,
  UserFailureAction,
  UserActionTypes,
  User,
} from './types';

const loadUsersRequest = (): UserRequestAction => ({
  type: UserActionTypes.LOAD_USERS_REQUEST,
});

const loadUsersSuccess = (users: User[]): UserSuccessAction => ({
  type: UserActionTypes.LOAD_USERS_SUCCESS,
  payload: {
    users,
  },
});

const loadUsersFailure = (message: string): UserFailureAction => ({
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
