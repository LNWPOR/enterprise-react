import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute({ children, roles, ...rest }) {
  const { isLoading, isProfileLoaded, user } = useSelector(
    (state) => state.auth
  )

  return (
    <Route
      {...rest}
      render={() => {
        if (!isProfileLoaded) return null
        if (isLoading) return null
        if (!user) return <Redirect to="/" />
        if (!roles.includes(user.role)) return <Redirect to="/" />

        return children
      }}
    ></Route>
  )
}
