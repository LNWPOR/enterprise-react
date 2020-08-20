import React, { FC, lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const TodoList = lazy(() => import('./TodoList'));

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
