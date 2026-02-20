import { describe, test, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import * as dogController from '../controllers/dogController';
import dogRoutes from '../routes/dogRoutes';

vi.mock('../controllers/dogController');

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);

describe('dogApi', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Test 5 - Negative test
  test('should return 500 with success false and an error message', async () => {
    vi.spyOn(dogController, 'getDogImage').mockImplementation(async (_req, res) => {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch dog image: Network error',
      });
    });

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      error: 'Failed to fetch dog image: Network error',
    });
  });
});