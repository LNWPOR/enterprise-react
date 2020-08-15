import React from 'react';
import { shallow } from 'enzyme';

import TodoForm from './TodoForm';

describe('TodoForm', () => {
  const fn = jest.fn<void, [string]>();
  const wrapper = shallow(<TodoForm onSubmit={fn} />);

  afterEach(() => {
    fn.mockClear();
  });

  it('renders TodoForm correctly', () => {
    expect(wrapper.find('button').text()).toBe('Add');
    expect(
      wrapper.find('input[placeholder="Enter some text..."]').exists()
    ).toBe(true);
  });

  it('submits new todo correctly', () => {
    const event = { target: { value: 'Lorem Ipsum' } };

    wrapper.find('input').simulate('change', event);
    wrapper.find('button').simulate('click');

    expect(fn).toHaveBeenCalledWith(event.target.value);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
