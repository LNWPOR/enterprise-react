import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import CategoryForm from './CategoryForm'
import * as actions from '../../actions'

export default function EditCategory() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const {
    isLoading,
    items: [category],
  } = useSelector((state) => state.categories)

  const updateCategory = useCallback(
    (category) => dispatch(actions.updateCategory(id, category)),
    [dispatch, id]
  )

  useEffect(() => {
    dispatch(actions.loadCategory(id))
  }, [dispatch, id])

  if (isLoading || !category) return null

  return (
    <CategoryForm
      type="EDIT"
      category={category}
      title="Update Category"
      submitText="Change"
      onSubmit={updateCategory}
    ></CategoryForm>
  )
}
