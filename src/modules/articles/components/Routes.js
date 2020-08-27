import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import ArticleList from './ArticleList'
import Article from './Article'

export default function () {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/:id`}>
        <Article></Article>
      </Route>
      <Route path={path}>
        <ArticleList></ArticleList>
      </Route>
    </Switch>
  )
}
