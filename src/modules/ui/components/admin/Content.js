import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Toolbar, Breadcrumbs, Link, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import { DRAWER_WIDTH } from '../../constants'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -(theme.spacing(7) + 1),
    [theme.breakpoints.up('md')]: {
      marginLeft: -DRAWER_WIDTH,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  breadcrumb: {
    margin: theme.spacing(2, 0),
  },
}))

const breadcrumbNameMap = {
  '/admin': 'Admin',
  '/admin/dashboard': 'Dashboard',
  '/admin/users': 'Users',
  '/admin/users/new': 'New User',
  '/admin/users/\\d+': 'User',
  '/admin/users/\\d+/edit': 'Edit User',
  '/admin/categories': 'Categories',
  '/admin/categories/new': 'New Category',
  '/admin/categories/\\d+': 'Category',
  '/admin/categories/\\d+/edit': 'Edit Category',
  '/admin/articles': 'Articles',
  '/admin/articles/new': 'New Article',
  '/admin/articles/\\d+': 'Article',
  '/admin/articles/\\d+/edit': 'Edit Article',
}

const LinkRouter = (props) => <Link {...props} component={RouterLink} />

export default function Content({ children }) {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  const classes = useStyles()
  const drawerOpen = useSelector((state) => state.ui.drawerOpen)

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: drawerOpen,
      })}
    >
      <Toolbar />
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1
          const to = `/${pathnames.slice(0, index + 1).join('/')}`
          const [, linkName] = Object.entries(breadcrumbNameMap).find(([k]) =>
            new RegExp(`^${k}$`).test(to)
          )

          return last ? (
            <Typography color="textPrimary" key={to}>
              {linkName}
            </Typography>
          ) : (
            <LinkRouter color="inherit" to={to} key={to}>
              {linkName}
            </LinkRouter>
          )
        })}
      </Breadcrumbs>
      {children}
    </main>
  )
}
