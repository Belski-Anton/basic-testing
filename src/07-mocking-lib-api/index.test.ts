import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();
  const mockAxiosInstance = {
    get: mockGet,
  };

  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockResponse = { id: 1, title: 'Test Post' };
    mockGet.mockResolvedValueOnce({
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      data: mockResponse,
    });

    await throttledGetDataFromApi('posts/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = 'posts/1';
    const mockResponse = { id: 1, title: 'Test Post' };
    mockGet.mockResolvedValueOnce({
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      data: mockResponse,
    });

    await throttledGetDataFromApi(relativePath);

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockResponse = { id: 1, title: 'Test Post' };
    mockGet.mockResolvedValueOnce({
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      data: mockResponse,
    });

    const result = await throttledGetDataFromApi('posts/1');

    expect(result).toEqual(mockResponse);
  });
});
