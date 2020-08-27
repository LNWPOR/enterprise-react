import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Typography, Container } from '@material-ui/core'

import * as actions from '../../actions'

export default function Category() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const {
    isLoading,
    items: [category],
  } = useSelector((state) => state.categories)

  useEffect(() => {
    dispatch(actions.loadCategory(id))
  }, [dispatch, id])

  if (isLoading) return null

  return (
    <Container maxWidth="md">
      <Typography variant="h6" component="h1">
        {category?.name}
      </Typography>
      <Typography variant="body1">{category?.desc}</Typography>
    </Container>
  )
}
