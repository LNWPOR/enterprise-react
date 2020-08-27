import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import ArticleForm from './ArticleForm'
import * as actions from '../../actions'

export default function NewArticle() {
  const dispatch = useDispatch()

  const createArticle = useCallback(
    (article) => dispatch(actions.createArticle(article)),
    [dispatch]
  )

  return (
    <ArticleForm
      type="CREATE"
      title="New Article"
      submitText="Create"
      onSubmit={createArticle}
    ></ArticleForm>
  )
}
