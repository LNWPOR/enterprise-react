import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import ArticleForm from './ArticleForm'
import * as actions from '../../actions'

export default function EditArticle() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const {
    isLoading,
    items: [article],
  } = useSelector((state) => state.articles)

  const updateArticle = useCallback(
    (article) => dispatch(actions.updateArticle(id, article)),
    [dispatch, id]
  )

  useEffect(() => {
    dispatch(actions.loadArticle(id))
  }, [dispatch, id])

  if (isLoading || !article) return null

  return (
    <ArticleForm
      type="EDIT"
      article={article}
      title="Update Article"
      submitText="Change"
      onSubmit={updateArticle}
    ></ArticleForm>
  )
}
