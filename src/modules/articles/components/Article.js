import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Avatar, Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import * as actions from '../actions'

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
}))

export default function Article() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { id } = useParams()
  const {
    isLoading,
    items: [article],
  } = useSelector((state) => state.articles)

  useEffect(() => {
    dispatch(actions.loadArticle(id))
  }, [dispatch, id])

  if (isLoading) return null

  return (
    <Container maxWidth="md">
      <Box display="flex" alignItems="center">
        <Avatar src={article?.user?.avatar}></Avatar>
        <div className={classes.title}>
          <Typography variant="h6" component="h1">
            {article?.title}
          </Typography>
          <Typography variant="body1">{article?.user?.name}</Typography>
        </div>
      </Box>
      <p dangerouslySetInnerHTML={{ __html: article?.body }}></p>
    </Container>
  )
}
