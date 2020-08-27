import React from 'react'

import BaseLayout from './BaseLayout'
import Header from './Header'
import Content from './Content'

export default function Layout({ children }) {
  return (
    <BaseLayout>
      <Header></Header>
      <Content>{children}</Content>
    </BaseLayout>
  )
}
