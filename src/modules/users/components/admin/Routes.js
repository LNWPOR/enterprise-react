import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'

import UserList from './UserList'
import EditUser from './EditUser'
import User from './User'
import ProtectedRoute from 'modules/auth/components/ProtectedRoute'

export default function () {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <ProtectedRoute path={`${path}/:id/edit`} roles={['Admin']}>
        <EditUser></EditUser>
      </ProtectedRoute>
      <ProtectedRoute path={`${path}/:id`} roles={['Admin']}>
        <User></User>
      </ProtectedRoute>
      <ProtectedRoute path={path} roles={['Admin']}>
        <UserList></UserList>
      </ProtectedRoute>
    </Switch>
  )
}
