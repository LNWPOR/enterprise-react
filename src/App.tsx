import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import PostsApp from './posts/PostsApp';

const App: FC = () => {
  return (
    <Router>
      <PostsApp></PostsApp>
    </Router>
  );
};

export default App;
