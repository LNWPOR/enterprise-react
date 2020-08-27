import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers'
import {
  Container,
  Grid,
  Paper,
  Button,
  TextField,
  Typography,
  LinearProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import * as actions from '../actions'
import Uploader from 'modules/ui/components/shared/Uploader'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  form: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  submitBtn: {
    display: 'block',
    marginLeft: 'auto',
  },
}))

export default function Profile() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector((state) => state.auth)
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string(),
        email: yup.string().email().required(),
        password: yup
          .string()
          .min(8)
          .transform((v) => (v === '' ? undefined : v)),
      })
    ),
  })

  const onSubmit = useCallback(
    (value) => {
      let profile = {}

      if (value.name !== user.name) profile.name = value.name
      if (value.email !== user.email) profile.email = value.email
      if (value.password) profile.password = value.password
      if (value.avatar.length === 1) profile.avatar = value.avatar[0]

      dispatch(actions.updateProfile(profile))
    },
    [dispatch, user]
  )

  useEffect(() => {
    if (!user) return

    setValue('name', user.name)
    setValue('email', user.email)
  }, [setValue, user])

  return (
    <Container maxWidth="sm">
      {isLoading && <LinearProgress></LinearProgress>}
      <Paper className={classes.root}>
        <Typography
          variant="h4"
          align="center"
          component="h1"
          className={classes.title}
        >
          Profile
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Uploader
                name="avatar"
                innerRef={register}
                image={user?.avatar}
                alt={user?.name}
                buttonText="Change Avatar"
              ></Uploader>
            </Grid>
            <Grid item xs={8}>
              <div className={classes.form}>
                <TextField
                  inputRef={register}
                  variant="outlined"
                  label="Name"
                  placeholder="Enter your name"
                  name="name"
                  fullWidth
                  helperText={errors.name?.message || ''}
                  error={Boolean(errors.name)}
                ></TextField>
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submitBtn}
                  disabled={!isValid || !isDirty}
                >
                  Update
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
