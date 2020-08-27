import React from 'react'
import { useDispatch } from 'react-redux'
import { AppBar, Toolbar, Link, IconButton, Button } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { Link as RouterLink, useRouteMatch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import logo from 'assets/images/logo.png'
import * as actions from 'modules/ui/actions'
import ThemeSwitcher from 'modules/ui/components/ThemeSwitcher'
import AuthMenu from 'modules/ui/components/AuthMenu'

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoLink: {
    marginRight: theme.spacing(2),
  },
  logoImage: {
    widht: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: '50%',
  },
  spacer: {
    flexGrow: 1,
  },
}))

export default function Header() {
  const classes = useStyles()
  const { path } = useRouteMatch()
  const dispatch = useDispatch()

  const toggleDrawer = () => dispatch(actions.toggleDrawer())

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          underline="none"
          className={classes.logoLink}
        >
          <img src={logo} alt="Babel Articles" className={classes.logoImage} />
        </Link>
        <Button component={RouterLink} to={path}>
          Admin
        </Button>
        <div className={classes.spacer}></div>
        <ThemeSwitcher></ThemeSwitcher>
        <AuthMenu></AuthMenu>
      </Toolbar>
    </AppBar>
  )
}
