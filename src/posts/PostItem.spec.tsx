import React from 'react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import PostItem from './PostItem';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PostItem', () => {
  it('renders PostItem correctly', async () => {
    const post = { id: 1, title: 'Title', body: 'Body' };

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: post })
    );

    const wrapper = mount(
      <MemoryRouter initialEntries={['/posts', `${post.id}`]}>
        <PostItem />
      </MemoryRouter>
    );

    await act(async () => {
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
    });

    for (const value of Object.values(post)) {
      expect(wrapper.text().includes(`${value}`)).toBe(true);
    }
  });
});
