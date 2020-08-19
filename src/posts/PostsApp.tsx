import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import PostList from './PostList';
import PostItem from './PostItem';

const PostsApp: FC = () => {
  return (
    <Switch>
      <Route path="/posts/:id">
        <PostItem></PostItem>
      </Route>
      <Route path="/posts">
        <PostList></PostList>
      </Route>
    </Switch>
  );
};

export default PostsApp;
