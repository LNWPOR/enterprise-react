import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import * as categoryActions from 'modules/categories/actions'
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
  toolbar: {
    '& .ql-toolbar': {
      backgroundColor: theme.palette.grey[300],
    },
    '& .ql-editor': {
      minHeight: 300,
    },
    '& .ql-editor.ql-blank::before': {
      color: theme.palette.grey[300],
    },
  },
  category: {
    width: '100%',
  },
}))

export default function ArticleForm({
  type,
  article,
  title,
  submitText,
  onSubmit,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { items: categories } = useSelector((state) => state.categories)
  const baseSchema = {
    title: yup.string().required(),
    excerpt: yup.string().required(),
    body: yup.string().required(),
    categoryId: yup.number().positive().required(),
  }
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    errors,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: article?.title,
      excerpt: article?.excerpt,
      body: article?.body,
      categoryId: article?.category?.id,
    },
    resolver: yupResolver(
      yup.object().shape(
        type === 'CREATE'
          ? {
              ...baseSchema,
              image: yup.mixed().test('image', (image) => image.length > 0),
            }
          : baseSchema
      )
    ),
  })
  const setBody = useCallback(
    (body) =>
      setValue('body', body, { shouldValidate: true, shouldDirty: true }),
    [setValue]
  )

  const submit = useCallback(
    (article) => {
      const { image, ...rest } = article

      if (image.length > 0) {
        return onSubmit({ ...rest, image: image[0] })
      }

      return onSubmit(rest)
    },
    [onSubmit]
  )

  useEffect(() => {
    dispatch(categoryActions.loadCategories())
    register({ name: 'body' })
  }, [dispatch, register])

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
                name="image"
                innerRef={register}
                image={article?.image}
                buttonText="Change Image"
              ></Uploader>
            </Grid>
            <Grid item xs={8}>
              <div className={classes.form}>
                <TextField
                  inputRef={register}
                  variant="outlined"
                  label="Title"
                  placeholder="Enter a title"
                  name="title"
                  fullWidth
                  helperText={errors.title?.message || ''}
                  error={Boolean(errors.title)}
                ></TextField>
                <TextField
                  inputRef={register}
                  variant="outlined"
                  label="Excerpt"
                  placeholder="Enter a excerpt"
                  name="excerpt"
                  fullWidth
                  multiline={true}
                  rows={3}
                  helperText={errors.excerpt?.message || ''}
                  error={Boolean(errors.excerpt)}
                ></TextField>
                <FormControl variant="outlined" className={classes.category}>
                  <InputLabel>Category</InputLabel>
                  <Controller
                    as={Select}
                    name="categoryId"
                    label="Category"
                    control={control}
                    defaultValue={''}
                  >
                    {categories.map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Controller>
                </FormControl>
              </div>
            </Grid>
          </Grid>
          <Box my={2} className={classes.toolbar}>
            <ReactQuill
              theme="snow"
              placeholder="Enter body here..."
              value={getValues('body')}
              onChange={setBody}
            />
          </Box>
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
