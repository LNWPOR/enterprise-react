import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import configureStore, { history } from 'store/configureStore'
import Routes from 'modules/ui/components/Routes'

const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes></Routes>
      </ConnectedRouter>
    </Provider>
  )
}
