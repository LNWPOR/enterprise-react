import { UserState, UserActionTypes } from './types';
import { RootActions } from 'modules/actions';

const initialState: UserState = {
  isLoading: false,
  items: [],
};

export default (
  state: UserState = initialState,
  action: RootActions
): UserState => {
  switch (action.type) {
    case UserActionTypes.LOAD_USERS_REQUEST:
      return { ...state, isLoading: true };
    case UserActionTypes.LOAD_USERS_SUCCESS:
      return { ...state, items: action.payload.users, isLoading: false };
    case UserActionTypes.LOAD_USERS_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
