import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Typography,
  TextField,
  Box,
  Paper,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  form: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export default function AuthForm({
  title,
  submitText,
  onSubmit,
  altLink,
  altText,
}) {
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    errors,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
      })
    ),
  })

  return (
    <Container maxWidth="sm">
      <Paper className={classes.root}>
        <Typography variant="h4" component="h1">
          <Box textAlign="center">{title}</Box>
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <TextField
            inputRef={register}
            variant="outlined"
            label="Email"
            placeholder="Enter your email"
            name="email"
            fullWidth
            helperText={errors.email?.message || ''}
            error={Boolean(errors.email)}
          ></TextField>
          <TextField
            type="password"
            inputRef={register}
            variant="outlined"
            label="Password"
            placeholder="Enter your password"
            name="password"
            fullWidth
            helperText={errors.password?.message || ''}
            error={Boolean(errors.password)}
          ></TextField>
          <Box display="flex" justifyContent="space-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid || !isDirty}
            >
              {submitText}
            </Button>
            <Button component={Link} to={altLink}>
              {altText}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}
