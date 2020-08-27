import React from 'react'
import { useDispatch } from 'react-redux'

import * as actions from '../actions'

import AuthForm from './AuthForm'

export default function Signup() {
  const dispatch = useDispatch()

  const register = (credential) => dispatch(actions.signup(credential))

  return (
    <AuthForm
      title="Sign up"
      submitText="Register"
      altText="Already have an account?"
      altLink="/auth/sign-in"
      onSubmit={register}
    ></AuthForm>
  )
}
