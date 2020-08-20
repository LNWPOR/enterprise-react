import React, { FC, lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const PostList = lazy(() => import('./PostList'));

const Layout: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path}>
        <PostList></PostList>
      </Route>
    </Switch>
  );
};

export default Layout;
