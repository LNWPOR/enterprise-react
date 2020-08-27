import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers'
import {
  Container,
  Paper,
  Button,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
  category: {
    width: '100%',
  },
}))

export default function CategoryForm({
  type,
  category,
  title,
  submitText,
  onSubmit,
}) {
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    errors,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: category?.name,
      desc: category?.desc,
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
        desc: yup.string().required(),
      })
    ),
  })

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
        <form onSubmit={handleSubmit(onSubmit)}>
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
              inputRef={register}
              variant="outlined"
              label="Description"
              placeholder="Enter a description"
              name="desc"
              fullWidth
              multiline={true}
              rows={3}
              helperText={errors.desc?.message || ''}
              error={Boolean(errors.desc)}
            ></TextField>
          </div>
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
