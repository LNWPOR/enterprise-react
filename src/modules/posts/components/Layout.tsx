import React, { FC, lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const PostList = lazy(() => import('./PostList'));
const PostDetails = lazy(() => import('./PostDetails'));

const Layout: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id`}>
        <PostDetails></PostDetails>
      </Route>
      <Route path={path}>
        <PostList></PostList>
      </Route>
    </Switch>
  );
};

export default Layout;
