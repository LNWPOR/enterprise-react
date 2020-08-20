import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Toolbar } from '@material-ui/core';

import PostsLayout from 'modules/posts/components/Layout';
import TodosLayout from 'modules/todos/components/Layout';
import UsersLayout from 'modules/users/components/Layout';

const Routes: FC = () => {
  return (
    <>
      <Toolbar></Toolbar>
      <Switch>
        <Route path="/posts">
          <PostsLayout></PostsLayout>
        </Route>
        <Route path="/todos">
          <TodosLayout></TodosLayout>
        </Route>
        <Route path="/users">
          <UsersLayout></UsersLayout>
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
