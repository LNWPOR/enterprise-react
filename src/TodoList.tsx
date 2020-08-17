import React, { FC } from 'react';

import useFetch from './useFetch';

type Todo = Readonly<{
  id: number;
  title: string;
}>;

const TodoList: FC = () => {
  const todos = useFetch<Todo>('/todos');

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default TodoList;
