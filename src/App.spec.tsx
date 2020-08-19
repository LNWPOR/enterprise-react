import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import PostsApp from './posts/PostsApp';

describe('App', () => {
  it('renders App correctly', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(BrowserRouter).contains(<PostsApp />));
  });
});
