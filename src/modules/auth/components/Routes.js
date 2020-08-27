import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import Profile from './Profile'
import Signin from './Signin'
import Signup from './Signup'

export default function Routes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/profile`}>
        <Profile></Profile>
      </Route>
      <Route path={`${path}/sign-in`}>
        <Signin></Signin>
      </Route>
      <Route path={`${path}/sign-up`}>
        <Signup></Signup>
      </Route>
    </Switch>
  )
}
