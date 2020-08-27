import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom'

import ProtectedComponent from './ProtectedComponent'

export default forwardRef((props, ref) => {
  const { roles, ...rest } = props

  return (
    <ProtectedComponent roles={roles}>
      <Link {...rest} ref={ref}></Link>
    </ProtectedComponent>
  )
})
