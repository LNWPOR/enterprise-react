import React, { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import PostList from './PostList';

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
