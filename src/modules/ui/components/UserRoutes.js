import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import ArticleRoutes from 'modules/articles/components/Routes'
import AuthRoutes from 'modules/auth/components/Routes'
import Layout from './Layout'

export default function Routes() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth">
          <AuthRoutes></AuthRoutes>
        </Route>
        <Route path="/articles">
          <ArticleRoutes></ArticleRoutes>
        </Route>
        <Route exact path="/">
          <Redirect to="/articles"></Redirect>
        </Route>
        <Route>
          <div>Page not found</div>
        </Route>
      </Switch>
    </Layout>
  )
}
