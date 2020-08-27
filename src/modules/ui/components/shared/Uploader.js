import React, { useCallback, useRef } from 'react'
import { Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  preview: {
    width: '100%',
  },
  placeholder: {
    flex: 1,
    backgroundColor: theme.palette.grey[600],
  },
  input: {
    display: 'none',
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}))

function Uploader({ name, image, alt, buttonText, innerRef }) {
  const classes = useStyles()
  const previewRef = useRef(null)

  const upload = useCallback((event) => {
    const input = event.target

    if (!input?.files?.[0]) return

    const reader = new FileReader()
    reader.onload = (event) => (previewRef.current.src = event.target.result)
    reader.readAsDataURL(input.files[0])
  }, [])

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <img src={image} alt={alt} ref={previewRef} className={classes.preview} />
      {!previewRef.current?.src && <div className={classes.placeholder}></div>}
      <input
        name={name}
        ref={innerRef}
        accept="image/*"
        className={classes.input}
        id="uploader"
        type="file"
        onChange={upload}
      />
      <label htmlFor="uploader">
        <Button
          variant="contained"
          color="primary"
          component="span"
          className={classes.button}
        >
          {buttonText}
        </Button>
      </label>
    </Box>
  )
}

export default Uploader
