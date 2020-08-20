import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import * as selectors from '../selectors';
import * as actions from '../actions';

const UserList: FC = () => {
  const dispatch = useDispatch();
  const { items: users, isLoading } = useSelector(selectors.getUsers);

  useEffect(() => {
    dispatch(actions.loadUsers());
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
      {users.map(({ id, name, email }) => (
        <ListItem key={id}>
          <ListItemText
            primary={name}
            secondary={
              <Typography component="span" variant="body2">
                {email}
              </Typography>
            }
          ></ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
