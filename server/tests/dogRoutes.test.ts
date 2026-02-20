import { describe, test, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import * as dogController from '../controllers/dogController';
import dogRoutes from '../routes/dogRoutes';

vi.mock('../controllers/dogController');

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);

describe('dogRoutes', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Test 4 - Positive test
  test('should return 200 with success true and the mocked imageUrl', async () => {
    const mockResponseData = {
      success: true,
      data: {
        imageUrl: 'https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg',
        status: 'success',
      },
    };

    vi.spyOn(dogController, 'getDogImage').mockImplementation(async (_req, res) => {
      res.status(200).json(mockResponseData);
    });

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toBe(mockResponseData.data.imageUrl);
  });
});
