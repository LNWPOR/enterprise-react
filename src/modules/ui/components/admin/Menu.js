import React from 'react'
import { Link, useRouteMatch, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Group, MenuBook, Category, Dashboard } from '@material-ui/icons'

import { DRAWER_WIDTH } from '../../constants'

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerExpand: {
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerCollapse: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

export default function Menu() {
  const classes = useStyles()
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const drawerOpen = useSelector((state) => state.ui.drawerOpen)
  const mediumUp = useMediaQuery((theme) => theme.breakpoints.up('md'))

  return (
    <Drawer
      variant="persistent"
      open={drawerOpen}
      className={clsx(classes.drawer, {
        [classes.drawerExpand]: mediumUp,
        [classes.drawerCollapse]: !mediumUp,
      })}
      classes={{
        paper: clsx({
          [classes.drawerExpand]: mediumUp,
          [classes.drawerCollapse]: !mediumUp,
        }),
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem
            button
            component={Link}
            to={`${path}/dashboard`}
            selected={pathname.startsWith(`${path}/dashboard`)}
          >
            <ListItemIcon>
              <Dashboard></Dashboard>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to={`${path}/users`}
            selected={pathname.startsWith(`${path}/users`)}
          >
            <ListItemIcon>
              <Group></Group>
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to={`${path}/categories`}
            selected={pathname.startsWith(`${path}/categories`)}
          >
            <ListItemIcon>
              <Category></Category>
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to={`${path}/articles`}
            selected={pathname.startsWith(`${path}/articles`)}
          >
            <ListItemIcon>
              <MenuBook></MenuBook>
            </ListItemIcon>
            <ListItemText primary="Articles" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  )
}
