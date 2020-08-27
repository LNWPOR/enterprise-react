import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'

import ArticleList from './ArticleList'
import NewArticle from './NewArticle'
import EditArticle from './EditArticle'
import Article from '../Article'
import ProtectedRoute from 'modules/auth/components/ProtectedRoute'

export default function () {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <ProtectedRoute path={`${path}/new`} roles={['Admin', 'Editor']}>
        <NewArticle></NewArticle>
      </ProtectedRoute>
      <ProtectedRoute path={`${path}/:id/edit`} roles={['Admin', 'Editor']}>
        <EditArticle></EditArticle>
      </ProtectedRoute>
      <ProtectedRoute path={`${path}/:id`} roles={['Admin', 'Editor']}>
        <Article></Article>
      </ProtectedRoute>
      <ProtectedRoute path={path} roles={['Admin', 'Editor']}>
        <ArticleList></ArticleList>
      </ProtectedRoute>
    </Switch>
  )
}
