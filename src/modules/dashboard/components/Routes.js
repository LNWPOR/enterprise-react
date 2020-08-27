import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'

import ProtectedRoute from 'modules/auth/components/ProtectedRoute'
import Dashboard from './Dashboard'

export default function () {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <ProtectedRoute path={path} roles={['Admin']}>
        <Dashboard></Dashboard>
      </ProtectedRoute>
    </Switch>
  )
}
