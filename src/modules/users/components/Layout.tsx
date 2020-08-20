import React, { FC, lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const UserList = lazy(() => import('./UserList'));

const Layout: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path}>
        <UserList></UserList>
      </Route>
    </Switch>
  );
};

export default Layout;
