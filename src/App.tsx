import React, { FC } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Layout from 'modules/ui/components/Layout';

const store = configureStore();

const App: FC = () => {
  return (
    <Provider store={store}>
      <Layout></Layout>
    </Provider>
  );
};

export default App;
