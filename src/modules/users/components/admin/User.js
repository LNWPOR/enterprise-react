import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Avatar, Typography, Container, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import * as actions from '../../actions'

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
  role: {
    marginLeft: theme.spacing(2),
  },
}))

export default function User() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { id } = useParams()
  const {
    isLoading,
    items: [user],
  } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(actions.loadUser(id))
  }, [dispatch, id])

  if (isLoading) return null
  console.log(user)

  return (
    <Container maxWidth="md">
      <Box display="flex" alignItems="center">
        <Avatar src={user?.avatar}></Avatar>
        <div className={classes.title}>
          <Typography variant="h6" component="h1">
            {user?.name}
          </Typography>
          <Box display="flex">
            <Typography variant="body1">{user?.email}</Typography>
            <Chip label={user?.role} size="small" className={classes.role} />
          </Box>
        </div>
      </Box>
    </Container>
  )
}
