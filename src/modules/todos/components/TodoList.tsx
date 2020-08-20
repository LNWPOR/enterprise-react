import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import * as selectors from '../selectors';
import * as actions from '../actions';

const TodoList: FC = () => {
  const dispatch = useDispatch();
  const { items: todos, isLoading } = useSelector(selectors.getTodos);

  useEffect(() => {
    dispatch(actions.loadTodos());
  }, [dispatch]);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} animation="wave" height={50}></Skeleton>
        ))}
      </>
    );
  }

  return (
    <List>
      {todos.map(({ id, title }) => (
        <ListItem key={id}>
          <ListItemText primary={title}></ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
