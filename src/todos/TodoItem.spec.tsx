import React from 'react';
import { shallow } from 'enzyme';

import { Todo } from './types';
import TodoItem from './TodoItem';

describe('TodoItem', () => {
  it('renders TodoItem correctly', () => {
    const todo: Todo = { id: 1, text: 'Lorem' };
    const wrapper = shallow(<TodoItem todo={todo} />);

    expect(wrapper.text()).toBe(todo.text);
  });
});
