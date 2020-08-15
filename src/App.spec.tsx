import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import TodoApp from './todos/TodoApp';

describe('App', () => {
  it('renders App correctly', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.contains(<TodoApp />)).toBe(true);
  });
});
