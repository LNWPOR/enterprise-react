import React, { FC } from 'react';

import { Todo } from './types';
import TodoItem from './TodoItem';

type Props = {
  todos: Todo[];
};

const TodoList: FC<Props> = ({ todos }) => {
  if (todos.length === 0) return <div>No todos found</div>;

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo}>
          {todo.text}
        </TodoItem>
      ))}
    </ul>
  );
};

export default TodoList;
