import React, { FC, useState } from 'react';

import { Todo } from './types';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoApp: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: +new Date(), text }]);
  };

  return (
    <>
      <TodoForm onSubmit={addTodo}></TodoForm>
      <TodoList todos={todos}></TodoList>
    </>
  );
};

export default TodoApp;
