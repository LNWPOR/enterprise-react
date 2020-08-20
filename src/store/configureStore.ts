import { createStore, applyMiddleware, Store, Middleware } from 'redux';
import Thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { RootState } from 'modules/reducers';

function configureStore(initialState?: RootState): Store<RootState> {
  const middleware: Middleware[] = [Thunk];

  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}

export default configureStore;
