import { describe, test, expect, vi, beforeEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

describe('dogService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // Test 1 - Positive test
  test('should return imageUrl matching message and status success when API call succeeds', async () => {
    const mockApiData = {
      message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success',
    };

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockApiData),
    } as unknown as Response);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockApiData.message);
    expect(result.status).toBe('success');
    expect(global.fetch).toHaveBeenCalledOnce();
  });

  // Test 2 - Negative test
  test('should throw an error when the API returns a non-ok response', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
    } as unknown as Response);

    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image: Dog API returned status 500'
    );
  });
});
