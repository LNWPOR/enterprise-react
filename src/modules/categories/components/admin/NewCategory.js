import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import CategoryForm from './CategoryForm'
import * as actions from '../../actions'

export default function NewCategory() {
  const dispatch = useDispatch()

  const createCategory = useCallback(
    (category) => dispatch(actions.createCategory(category)),
    [dispatch]
  )

  return (
    <CategoryForm
      type="CREATE"
      title="New Category"
      submitText="Create"
      onSubmit={createCategory}
    ></CategoryForm>
  )
}
