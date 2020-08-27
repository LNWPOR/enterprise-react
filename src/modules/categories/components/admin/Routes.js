import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'

import CategoryList from './CategoryList'
import NewCategory from './NewCategory'
import EditCategory from './EditCategory'
import Category from './Category'
import ProtectedRoute from 'modules/auth/components/ProtectedRoute'

export default function () {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <ProtectedRoute path={`${path}/new`} roles={['Admin']}>
        <NewCategory></NewCategory>
      </ProtectedRoute>
      <ProtectedRoute path={`${path}/:id/edit`} roles={['Admin']}>
        <EditCategory></EditCategory>
      </ProtectedRoute>
      <ProtectedRoute path={`${path}/:id`} roles={['Admin']}>
        <Category></Category>
      </ProtectedRoute>
      <ProtectedRoute path={path} roles={['Admin', 'Editor']}>
        <CategoryList></CategoryList>
      </ProtectedRoute>
    </Switch>
  )
}
