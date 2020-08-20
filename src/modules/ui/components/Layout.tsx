import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Header';
import Routes from './Routes';

const Layout: FC = () => {
  return (
    <Router>
      <Header></Header>
      <Routes></Routes>
    </Router>
  );
};

export default Layout;
