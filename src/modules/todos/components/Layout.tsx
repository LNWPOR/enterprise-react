import React, { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import TodoList from './TodoList';

const Layout: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path}>
        <TodoList></TodoList>
      </Route>
    </Switch>
  );
};

export default Layout;
