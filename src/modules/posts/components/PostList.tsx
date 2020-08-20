import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import * as selectors from '../selectors';
import * as actions from '../actions';

const PostList: FC = () => {
  const dispatch = useDispatch();
  const { items: products, isLoading } = useSelector(selectors.getPosts);

  useEffect(() => {
    dispatch(actions.loadPosts());
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
      {products.map(({ id, title, body }) => (
        <ListItem key={id}>
          <ListItemText
            primary={title}
            secondary={
              <Typography component="span" variant="body2">
                {body}
              </Typography>
            }
          ></ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;
