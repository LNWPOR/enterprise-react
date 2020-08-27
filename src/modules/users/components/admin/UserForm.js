import React, { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers'
import {
  Container,
  Grid,
  Paper,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
    marginTop: theme.spacing(2),
  },
  role: {
    width: '100%',
  },
}))

export default function UserForm({ type, user, title, submitText, onSubmit }) {
  const classes = useStyles()
  const {
    register,
    control,
    handleSubmit,
    errors,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: user?.name,
      email: user?.email,
      role: user?.role,
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        role: yup.mixed().oneOf(['Admin', 'Editor', 'Member']).required(),
      })
    ),
  })

  const submit = useCallback(
    (user) => {
      const { avatar, ...rest } = user

      if (avatar.length > 0) {
        return onSubmit({ ...rest, avatar: avatar[0] })
      }

      return onSubmit(rest)
    },
    [onSubmit]
  )

  return (
    <Container maxWidth="md">
      <Paper className={classes.root}>
        <Typography
          variant="h4"
          align="center"
          component="h1"
          className={classes.title}
        >
          {title}
        </Typography>
        <form onSubmit={handleSubmit(submit)}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Uploader
                name="avatar"
                innerRef={register}
                image={user?.avatar}
                buttonText="Change Avatar"
              ></Uploader>
            </Grid>
            <Grid item xs={8}>
              <div className={classes.form}>
                <TextField
                  inputRef={register}
                  variant="outlined"
                  label="Name"
                  placeholder="Enter a name"
                  name="name"
                  fullWidth
                  helperText={errors.name?.message || ''}
                  error={Boolean(errors.name)}
                ></TextField>
                <TextField
                  type="email"
                  inputRef={register}
                  variant="outlined"
                  label="Email"
                  placeholder="Enter a email"
                  name="email"
                  fullWidth
                  helperText={errors.email?.message || ''}
                  error={Boolean(errors.email)}
                ></TextField>
                <FormControl variant="outlined" className={classes.role}>
                  <InputLabel>Role</InputLabel>
                  <Controller
                    as={Select}
                    name="role"
                    label="Role"
                    control={control}
                    defaultValue={''}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Editor">Editor</MenuItem>
                    <MenuItem value="Member">Member</MenuItem>
                  </Controller>
                </FormControl>
              </div>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitBtn}
            disabled={!isValid || !isDirty}
          >
            {submitText}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
