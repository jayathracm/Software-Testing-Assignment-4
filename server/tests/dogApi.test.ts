import { describe, test, expect } from 'vitest';
import request from 'supertest';
import express, { Request, Response } from 'express';
import dogRoutes from '../routes/dogRoutes';

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

describe('dogApi', () => {
  // Test 1
  test('GET /api/dogs/random should return a random dog image with status 200', async () => {
    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toBeDefined();

    expect(response.body.data).toHaveProperty('imageUrl');

    expect(typeof response.body.data.imageUrl).toBe('string');
  });

  // Test 2
  test('GET /api/dogs/invalid should return 404 with an error message', async () => {
    const response = await request(app).get('/api/dogs/invalid');

    expect(response.status).toBe(404);

    expect(response.body).toHaveProperty('error');
    
    expect(response.body.error).toBe('Route not found');
  });
});