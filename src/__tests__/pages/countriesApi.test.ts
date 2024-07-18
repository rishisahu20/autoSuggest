import { GET } from '../path/to/entryFile'; // Adjust the import path
import { createMocks } from 'node-mocks-http';
import { NextRequest } from 'next/server';

jest.mock('@/app/api/controllers/countryController');

describe('GET entry point', () => {
  it('should return a successful response from the handler', async () => {

    const { req } = createMocks({
      method: 'GET',
    });

    const params = { country: 'USA' };
    const response = await GET(req as unknown as NextRequest, { params });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ data: 'success' });
  });

  it('should return a 400 error for validation errors', async () => {

    const { req } = createMocks({
      method: 'GET',
    });

    const params = { country: 'invalid' };
    const response = await GET(req as unknown as NextRequest, { params });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: ['Validation error'] });
  });

  it('should return a 500 error for other errors', async () => {

    const { req } = createMocks({
      method: 'GET',
    });

    const params = { country: 'USA' };
    const response = await GET(req as unknown as NextRequest, { params });

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: 'Internal Server Error' });
  });
});
