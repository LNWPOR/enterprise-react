import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import BaseLayout from 'modules/ui/components/BaseLayout'
import Header from './Header'
import Menu from './Menu'
import Content from './Content'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}))

export default function Layout({ children }) {
  const classes = useStyles()

  return (
    <BaseLayout className={classes.root}>
      <Header></Header>
      <Menu></Menu>
      <Content>{children}</Content>
    </BaseLayout>
  )
}
