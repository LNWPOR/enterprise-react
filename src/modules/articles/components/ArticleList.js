import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import {
  Paper,
  Box,
  Grid,
  CircularProgress,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { Search } from '@material-ui/icons'
import queryString from 'query-string'

import * as categoryActions from 'modules/categories/actions'
import * as articleActions from '../actions'
import ArticleItem from './ArticleItem'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  progress: {
    textAlign: 'center',
  },
  category: {
    minWidth: 120,
  },
}))

export default function ArticleList() {
  const classes = useStyles()
  const history = useHistory()
  const { path } = useRouteMatch()
  const dispatch = useDispatch()
  const { isLoading, items: articles, paging } = useSelector(
    (state) => state.articles
  )
  const { items: categories } = useSelector((state) => state.categories)
  const { search } = useLocation()
  const [query, setQuery] = useState(queryString.parse(search))
  const [term, setTerm] = useState(query.term || '')

  const changeCategory = useCallback(
    (event) => {
      const categoryId = event.target.value

      if (categoryId !== 0) return setQuery({ ...query, categoryId })

      const { categoryId: _, ...rest } = query

      setQuery(rest)
    },
    [query]
  )

  const changeTerm = useCallback((event) => setTerm(event.target.value), [])

  const [changeSearchTerm] = useDebouncedCallback(() => {
    if (term.trim() !== '') return setQuery({ ...query, term })

    const { term: _, ...rest } = query

    setQuery(rest)
  }, 1000)

  const changePage = useCallback(
    (_event, page) => {
      if (page > 1) return setQuery({ ...query, page })

      const { page: _, ...rest } = query

      setQuery(rest)
    },
    [query]
  )

  useEffect(() => {
    dispatch(articleActions.loadArticles(search))
    dispatch(categoryActions.loadCategories())
  }, [dispatch, search])

  useEffect(() => history.push(`${path}?${queryString.stringify(query)}`), [
    history,
    path,
    query,
  ])

  return (
    <>
      {isLoading ? (
        <div className={classes.progress}>
          <CircularProgress color="secondary"></CircularProgress>
        </div>
      ) : (
        <>
          <Typography variant="h4" component="h1" className={classes.title}>
            Articles
          </Typography>
          <Paper>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              mb={2}
            >
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item>
                  <Search />
                </Grid>
                <Grid item>
                  <TextField
                    label="Search"
                    value={term}
                    onChange={changeTerm}
                    onKeyUp={changeSearchTerm}
                  />
                </Grid>
              </Grid>
              <FormControl className={classes.category}>
                <InputLabel>Category</InputLabel>
                <Select value={query.categoryId || 0} onChange={changeCategory}>
                  <MenuItem value={0}>All</MenuItem>
                  {categories.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>
          <Grid container spacing={2}>
            {articles.map((article) => (
              <ArticleItem key={article.id} {...article}></ArticleItem>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" p={2}>
            <Pagination
              count={paging?.totalPage}
              defaultPage={paging?.page}
              variant="outlined"
              color="primary"
              onChange={changePage}
            />
          </Box>
        </>
      )}
    </>
  )
}
