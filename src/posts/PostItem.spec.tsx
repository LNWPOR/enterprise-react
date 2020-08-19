import React from 'react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

import PostItem from './PostItem';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PostItem', () => {
  it('renders PostItem correctly', () => {
    const post = { id: 1, title: 'Title', body: 'Body' };

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: post })
    );

    const wrapper = shallow(
      <MemoryRouter initialEntries={['/posts', `${post.id}`]}>
        <PostItem />
      </MemoryRouter>
    );

    for (const value of Object.values(post)) {
      expect(wrapper.exists(`dd[children='${value}']`));
    }
  });
});
