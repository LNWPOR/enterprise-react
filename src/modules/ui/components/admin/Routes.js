import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'

import Layout from './Layout'
import ArticleRoutes from 'modules/articles/components/admin/Routes'
import CategoryRoutes from 'modules/categories/components/admin/Routes'
import UserRoutes from 'modules/users/components/admin/Routes'
import DashboardRoutes from 'modules/dashboard/components/Routes'

export default function Routes() {
  const { path } = useRouteMatch()

  return (
    <Layout>
      <Switch>
        <Route path={`${path}/dashboard`}>
          <DashboardRoutes></DashboardRoutes>
        </Route>
        <Route path={`${path}/users`}>
          <UserRoutes></UserRoutes>
        </Route>
        <Route path={`${path}/articles`}>
          <ArticleRoutes></ArticleRoutes>
        </Route>
        <Route path={`${path}/categories`}>
          <CategoryRoutes></CategoryRoutes>
        </Route>
        <Route>
          <Redirect to={`${path}/dashboard`}></Redirect>
        </Route>
      </Switch>
    </Layout>
  )
}
