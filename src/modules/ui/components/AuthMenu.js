import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {
  Box,
  Button,
  Avatar,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'

import * as actions from 'modules/auth/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
  },
  username: {
    marginLeft: theme.spacing(1),
  },
}))

export default function AuthMenu() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { isLoading, accessToken, user } = useSelector((state) => state.auth)
  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = useCallback((event) => setAnchorEl(event.currentTarget), [])

  const closeMenu = useCallback(() => setAnchorEl(null), [])

  const logout = useCallback(() => {
    dispatch(actions.logout())
    closeMenu()
  }, [closeMenu, dispatch])

  const goToProfile = useCallback(() => {
    history.push('/auth/profile')
    closeMenu()
  }, [closeMenu, history])

  const Placeholder = () => (
    <Box display="flex" alignItems="center" className={classes.root}>
      <Skeleton variant="circle" width={40} height={40}></Skeleton>
      <Skeleton
        variant="text"
        width={100}
        height={30}
        className={classes.username}
      />
    </Box>
  )

  useEffect(() => {
    dispatch(actions.loadToken())
  }, [dispatch])

  useEffect(() => {
    if (accessToken) dispatch(actions.loadProfile())
  }, [dispatch, accessToken])

  if (isLoading) return <Placeholder></Placeholder>
  if (user) {
    return (
      <>
        <Box
          display="flex"
          alignItems="center"
          className={classes.root}
          onClick={openMenu}
        >
          <Avatar src={user.avatar}></Avatar>
          <Typography variant="button" className={classes.username}>
            {user.name || 'Member'}
          </Typography>
        </Box>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <MenuItem onClick={goToProfile}>Profile</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </>
    )
  }
  if (accessToken) return <Placeholder></Placeholder>

  return (
    <div>
      <Button color="inherit" component={Link} to="/auth/sign-in">
        Login
      </Button>
    </div>
  )
}
