import React, { useEffect, useState, useCallback } from 'react'
import { Link as RouterLink, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Typography,
  Box,
  ButtonGroup,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AddCircleOutline, Delete } from '@material-ui/icons'

import * as actions from '../../actions'
import ProtectedLink from 'modules/auth/components/ProtectedLink'
import ProtectedComponent from 'modules/auth/components/ProtectedComponent'

const useStyles = makeStyles((theme) => ({
  spacer: {
    margin: theme.spacing(2, 0),
  },
  delete: {
    marginLeft: 'auto',
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    height: 'max-content',
  },
}))

export default function CategoryList() {
  const classes = useStyles()
  const { path } = useRouteMatch()
  const [selected, setSelected] = useState(0)
  const [isDialogOpened, setIsDialogOpened] = useState(false)
  const dispatch = useDispatch()
  const { items: categories } = useSelector((state) => state.categories)

  const selectRow = (id) => () => setSelected(selected === id ? 0 : id)

  const deleteCategory = useCallback(() => {
    dispatch(actions.deleteCategory(selected))
    setIsDialogOpened(false)
  }, [dispatch, selected])

  useEffect(() => {
    dispatch(actions.loadCategories())
  }, [dispatch])

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
              Are you sure you want to delete this category?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpened(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteCategory} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" component="h1">
          Category List
        </Typography>
        <Button
          component={ProtectedLink}
          roles={['Admin']}
          to={`${path}/new`}
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutline />}
        >
          Add new category
        </Button>
      </Box>
      <Paper className={classes.spacer}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
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
                <TableCell>Name</TableCell>
                <TableCell>Desc</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => {
                const { id } = category
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
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.desc}</TableCell>
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
        </TableContainer>
      </Paper>
    </div>
  )
}
