import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import UserForm from './UserForm'
import * as actions from '../../actions'

export default function EditUser() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const {
    isLoading,
    items: [user],
  } = useSelector((state) => state.users)

  const updateUser = useCallback(
    (user) => dispatch(actions.updateUser(id, user)),
    [dispatch, id]
  )

  useEffect(() => {
    dispatch(actions.loadUser(id))
  }, [dispatch, id])

  if (isLoading || !user) return null

  return (
    <UserForm
      type="EDIT"
      user={user}
      title="Update User"
      submitText="Change"
      onSubmit={updateUser}
    ></UserForm>
  )
}
