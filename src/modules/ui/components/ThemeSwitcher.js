import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { Brightness4, Brightness7 } from '@material-ui/icons'

import * as actions from '../actions'

export default function ThemeSwitcher() {
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.ui.darkMode)

  const toggleDarkMode = () => dispatch(actions.toggleDarkMode())

  return (
    <IconButton onClick={toggleDarkMode}>
      {darkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  )
}
