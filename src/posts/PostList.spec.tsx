import React from 'react';
import axios from 'axios';
import { MemoryRouter, Link } from 'react-router-dom';
import { shallow } from 'enzyme';

import PostList from './PostList';
import { Post } from './types/Post';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PostList', () => {
  it('renders PostList correctly', () => {
    const posts: Post[] = [
      { id: 1, title: 'Title#1', body: 'Body#1' },
      { id: 2, title: 'Title#2', body: 'Body#2' },
      { id: 3, title: 'Title#3', body: 'Body#3' },
      { id: 4, title: 'Title#4', body: 'Body#4' },
      { id: 5, title: 'Title#5', body: 'Body#5' },
    ];

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: posts })
    );

    const wrapper = shallow(
      <MemoryRouter initialEntries={['/posts']}>
        <PostList />
      </MemoryRouter>
    );
    const ul = wrapper.find('ul');

    for (const post of posts) {
      expect(ul.contains(<Link to={`/posts/${post.id}`}>{post.title}</Link>));
    }
  });
});
