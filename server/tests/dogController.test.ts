import { describe, test, expect, vi, beforeEach } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';
import type { Request, Response } from 'express';

vi.mock('../services/dogService');

describe('dogController', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Test 3 - Positive test
  test('should respond with success true and the data returned by dogService', async () => {
    const mockServiceData = {
      imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success',
    };

    vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue(mockServiceData);

    const mockReq = {} as Request;
    const mockRes: Partial<Response> = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    };

    await getDogImage(mockReq, mockRes as Response);

    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      data: mockServiceData,
    });
  });
});
