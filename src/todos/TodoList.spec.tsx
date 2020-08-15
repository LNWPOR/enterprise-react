import React from 'react';
import { shallow } from 'enzyme';

import { Todo } from './types';
import TodoList from './TodoList';
import TodoItem from './TodoItem';

describe('TodoList', () => {
  it('renders TodoList correctly', () => {
    const todos: Todo[] = [
      { id: 1, text: 'Lorem' },
      { id: 2, text: 'Ipsum' },
    ];
    const wrapper = shallow(<TodoList todos={todos} />);
    const ul = wrapper.find('ul');

    for (const todo of todos) {
      expect(ul.contains(<TodoItem todo={todo}>{todo.text}</TodoItem>)).toBe(
        true
      );
    }
  });
});
