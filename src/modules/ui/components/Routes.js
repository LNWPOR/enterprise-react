import React from 'react'
import { Switch, Route } from 'react-router-dom'

import UserRoutes from './UserRoutes'
import AdminRoutes from './admin/Routes'

export default function Routes() {
  return (
    <Switch>
      <Route path="/admin">
        <AdminRoutes></AdminRoutes>
      </Route>
      <Route>
        <UserRoutes></UserRoutes>
      </Route>
    </Switch>
  )
}
