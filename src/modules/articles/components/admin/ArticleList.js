import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useRouteMatch } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import {
  Typography,
  Box,
  ButtonGroup,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Avatar,
  TextField,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AddCircleOutline, Search, Delete } from '@material-ui/icons'
import queryString from 'query-string'

import * as actions from '../../actions'

const useStyles = makeStyles((theme) => ({
  spacer: {
    margin: theme.spacing(2, 0),
  },
  delete: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    height: 'max-content',
  },
}))

export default function ArticleList() {
  const classes = useStyles()
  const { path } = useRouteMatch()
  const [query, setQuery] = useState({ page: 1, limit: 12 })
  const [selected, setSelected] = useState(0)
  const [isDialogOpened, setIsDialogOpened] = useState(false)
  const [term, setTerm] = useState(query.term || '')
  const dispatch = useDispatch()
  const { items: articles, paging } = useSelector((state) => state.articles)

  const changeTerm = useCallback((event) => setTerm(event.target.value), [])

  const [changeSearchTerm] = useDebouncedCallback(() => {
    if (term.trim() !== '') return setQuery({ ...query, term })

    const { term: _, ...rest } = query

    setQuery(rest)
  }, 1000)

  const changePage = useCallback(
    (_, page) => setQuery({ ...query, page: page + 1 }),
    [query]
  )

  const changeRowsPerPage = useCallback(
    (event) => {
      setQuery({ ...query, page: 1, limit: parseInt(event.target.value) })
    },
    [query]
  )

  const selectRow = useCallback(
    (id) => () => setSelected(selected === id ? 0 : id),
    [selected]
  )

  const deleteArticle = useCallback(() => {
    dispatch(actions.deleteArticle(selected))
    setIsDialogOpened(false)
  }, [dispatch, selected])

  useEffect(() => {
    dispatch(actions.loadArticles('?' + queryString.stringify(query)))
  }, [dispatch, query])

  return (
    <div>
      {isDialogOpened && (
        <Dialog
          open={isDialogOpened}
          onClose={() => setIsDialogOpened(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this article?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpened(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteArticle} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" component="h1">
          Article List
        </Typography>
        <Button
          component={RouterLink}
          to={`${path}/new`}
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutline />}
        >
          Add new article
        </Button>
      </Box>
      <Paper className={classes.spacer}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
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
          <Button
            variant="outlined"
            startIcon={<Delete />}
            className={classes.delete}
            disabled={selected === 0}
            onClick={() => setIsDialogOpened(true)}
          >
            Delete
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article) => {
                const { id } = article
                const isRowSelected = id === selected

                return (
                  <TableRow
                    key={id}
                    selected={isRowSelected}
                    onClick={selectRow(id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isRowSelected} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Avatar variant="square" src={article.image}></Avatar>
                    </TableCell>
                    <TableCell>{article.title}</TableCell>
                    <TableCell>{article.category.name}</TableCell>
                    <TableCell>
                      <ButtonGroup size="small" variant="text" color="primary">
                        <Button
                          component={RouterLink}
                          to={`${path}/${id}`}
                          underline="none"
                        >
                          View
                        </Button>
                        <Button
                          component={RouterLink}
                          to={`${path}/${id}/edit`}
                          underline="none"
                        >
                          Edit
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[12, 20, 50]}
            component="div"
            count={paging?.count || 0}
            rowsPerPage={paging?.limit || 12}
            page={paging?.page ? paging.page - 1 : 0}
            onChangePage={changePage}
            onChangeRowsPerPage={changeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </div>
  )
}
