import React, { FC } from 'react';
import UserList from './UserList';
import PostList from './PostList';
import TodoList from './TodoList';

const App: FC = () => {
  return (
    <div>
      <UserList></UserList>
      <PostList></PostList>
      <TodoList></TodoList>
    </div>
  );
};

export default App;
