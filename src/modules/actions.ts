import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { RootState } from './reducers';
import { PostActions } from 'modules/posts/types';
import { TodoActions } from 'modules/todos/types';
import { UserActions } from 'modules/users/types';

type BaseAction = {
  type: '@@INIT';
};

export type RootActions = PostActions | TodoActions | UserActions | BaseAction;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
