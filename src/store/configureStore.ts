import { createStore, applyMiddleware, Store, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { RootState } from '../modules/reducers';

function configureStore(initialState?: RootState): Store<RootState> {
  const middleware: Middleware[] = [];

  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}

export default configureStore;
