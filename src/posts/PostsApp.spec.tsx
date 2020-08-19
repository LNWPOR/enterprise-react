import React, { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

import PostsApp from './PostsApp';
import PostList from './PostList';
import PostItem from './PostItem';

describe('PostsApp', () => {
  const getWrapper = (path: string) => {
    return shallow(
      <MemoryRouter initialEntries={[path]}>
        <PostsApp />
      </MemoryRouter>
    )
      .find(PostsApp)
      .dive();
  };

  it('routes to related components correctly', () => {
    const routesMapping: { [k: string]: FC } = {
      '/posts': PostList,
      '/posts/1': PostItem,
    };

    for (const [path, Component] of Object.entries(routesMapping)) {
      const wrapper = getWrapper(path);

      expect(wrapper.contains(<Component />)).toBe(true);
    }
  });
});
