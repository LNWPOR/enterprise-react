import React, { useEffect, useState, useCallback } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Search, Delete } from '@material-ui/icons'
import queryString from 'query-string'

import * as actions from '../../actions'
import ProtectedLink from 'modules/auth/components/ProtectedLink'
import ProtectedComponent from 'modules/auth/components/ProtectedComponent'

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

const ROLE_COLORS = {
  Admin: 'primary',
  Editor: 'secondary',
  Member: 'default',
}

export default function UserList() {
  const classes = useStyles()
  const { path } = useRouteMatch()
  const [query, setQuery] = useState({ page: 1, limit: 12 })
  const [selected, setSelected] = useState(0)
  const [isDialogOpened, setIsDialogOpened] = useState(false)
  const [term, setTerm] = useState(query.term || '')
  const dispatch = useDispatch()
  const { items: users, paging } = useSelector((state) => state.users)

  const changeTerm = useCallback((event) => setTerm(event.target.value), [])

  const [changeSearchTerm] = useDebouncedCallback(() => {
    if (term.trim() !== '') return setQuery({ ...query, term })

    const { term: _, ...rest } = query

    setQuery(rest)
  }, 1000)

  const changePage = (_, page) => setQuery({ ...query, page: page + 1 })

  const changeRowsPerPage = (event) => {
    setQuery({ ...query, page: 1, limit: parseInt(event.target.value) })
  }

  const selectRow = (id) => () => setSelected(selected === id ? 0 : id)

  const deleteUser = useCallback(() => {
    dispatch(actions.deleteUser(selected))
    setIsDialogOpened(false)
  }, [dispatch, selected])

  useEffect(() => {
    dispatch(actions.loadUsers('?' + queryString.stringify(query)))
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
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpened(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteUser} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" component="h1">
          User List
        </Typography>
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
          <ProtectedComponent roles={['Admin']}>
            <Button
              variant="outlined"
              startIcon={<Delete />}
              className={classes.delete}
              disabled={selected === 0}
              onClick={() => setIsDialogOpened(true)}
            >
              Delete
            </Button>
          </ProtectedComponent>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <ProtectedComponent roles={['Admin']}>
                  <TableCell padding="checkbox"></TableCell>
                </ProtectedComponent>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                const { id, role, name, avatar } = user
                const isRowSelected = id === selected

                return (
                  <TableRow
                    key={id}
                    selected={isRowSelected}
                    onClick={selectRow(id)}
                  >
                    <ProtectedComponent roles={['Admin']}>
                      <TableCell padding="checkbox">
                        <Checkbox checked={isRowSelected} />
                      </TableCell>
                    </ProtectedComponent>
                    <TableCell component="th" scope="row">
                      <Avatar variant="square" src={avatar}></Avatar>
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>
                      <Chip
                        label={role}
                        color={ROLE_COLORS[role]}
                        size="small"
                      ></Chip>
                    </TableCell>
                    <TableCell>
                      <ButtonGroup size="small" variant="text" color="primary">
                        <Button
                          component={ProtectedLink}
                          roles={['Admin']}
                          to={`${path}/${id}`}
                          underline="none"
                        >
                          View
                        </Button>
                        <Button
                          component={ProtectedLink}
                          roles={['Admin']}
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
