import React from 'react'
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, Link, Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import logo from 'assets/images/logo.png'
import ThemeSwitcher from './ThemeSwitcher'
import AuthMenu from './AuthMenu'

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer,
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
  activeLink: {
    color: theme.palette.secondary.main,
  },
  spacer: {
    flexGrow: 1,
  },
}))

export default function Header() {
  const classes = useStyles()
  const user = useSelector((state) => state.auth.user)

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Link
          component={NavLink}
          to="/"
          color="inherit"
          underline="none"
          className={classes.logoLink}
        >
          <img src={logo} alt="Babel Articles" className={classes.logoImage} />
        </Link>
        {user?.role === 'Admin' && (
          <Button component={NavLink} to="/admin">
            Admin
          </Button>
        )}
        <Button
          component={NavLink}
          to="/articles"
          activeClassName={classes.activeLink}
        >
          Articles
        </Button>
        <div className={classes.spacer}></div>
        <ThemeSwitcher></ThemeSwitcher>
        <AuthMenu></AuthMenu>
      </Toolbar>
    </AppBar>
  )
}
