import React from 'react'
import { useDispatch } from 'react-redux'

import * as actions from '../actions'
import AuthForm from './AuthForm'

export default function Signin() {
  const dispatch = useDispatch()

  const login = (credential) => dispatch(actions.signin(credential))

  return (
    <AuthForm
      title="Sign in"
      submitText="sign in"
      altText="Don't have an account?"
      altLink="/auth/sign-up"
      onSubmit={login}
    ></AuthForm>
  )
}
