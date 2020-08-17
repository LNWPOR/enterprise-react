import axios from 'axios';
import { mocked } from 'ts-jest/utils';

import useFetch from './useFetch';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

type Item = Readonly<{
  id: number;
}>;

describe('useFetch', () => {
  it('returns data correctly', async () => {
    const data: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data }));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch<Item>('/items')
    );

    await waitForNextUpdate();

    expect(result.current).toBe(data);
  });
});
