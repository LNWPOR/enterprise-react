import React, { FC } from 'react';

import { Todo } from './types';

type Props = {
  todo: Todo;
};

const TodoItem: FC<Props> = ({ todo }) => {
  return <li>{todo.text}</li>;
};

export default TodoItem;
