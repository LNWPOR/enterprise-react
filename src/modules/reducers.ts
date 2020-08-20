import { combineReducers } from 'redux';

import posts from 'modules/posts/reducer';
import todos from 'modules/todos/reducer';
import users from 'modules/users/reducer';

const rootReducer = combineReducers({
  posts,
  todos,
  users,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
