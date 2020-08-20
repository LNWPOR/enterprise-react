import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { RootState } from 'modules/reducers';

function configureMockStore(
  initialState?: RootState
): MockStoreEnhanced<RootState> {
  const mockStore = configureStore<RootState>();
  const store = mockStore(initialState);

  return store;
}

export default configureMockStore;
