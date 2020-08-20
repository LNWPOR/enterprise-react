import React, { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import UserList from './UserList';

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
