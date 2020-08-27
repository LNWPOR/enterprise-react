import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles'
import { CssBaseline, useMediaQuery } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'

import * as actions from '../actions'

export default function Layout({ className, children }) {
  const dispatch = useDispatch()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const darkMode = useSelector((state) => state.ui.darkMode)

  useEffect(() => {
    const action = actions.setDarkMode(prefersDarkMode)

    dispatch(action)
  }, [prefersDarkMode, dispatch])

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1abc9c',
      },
      secondary: {
        main: purple[500],
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <div className={className}>{children}</div>
    </ThemeProvider>
  )
}
