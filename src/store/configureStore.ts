import { createStore, Store } from 'redux';

import rootReducer, { RootState } from '../modules/reducers';

function configureStore(initialState?: RootState): Store<RootState> {
  return createStore(rootReducer, initialState);
}

export default configureStore;
