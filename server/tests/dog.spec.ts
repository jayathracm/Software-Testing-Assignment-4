import { test, expect } from '@playwright/test';

test.describe('Dog Image App', () => {
  // Test 3
  test('should display a dog image when the page is loaded', async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse((res) =>
        res.url().includes('/api/dogs/random') && res.status() === 200
      ),
      page.goto('/'),
    ]);

    expect(response.status()).toBe(200);

    const dogImage = page.locator('img[alt="Random dog"]');
    await dogImage.waitFor({ state: 'visible' });

    const src = await dogImage.getAttribute('src');
    expect(src).toBeTruthy();

    expect(src).toMatch(/^https:\/\//);
  });

  // Test 4
  test('should display a new dog image when the button is clicked', async ({ page }) => {
    await Promise.all([
      page.waitForResponse((res) =>
        res.url().includes('/api/dogs/random') && res.status() === 200
      ),
      page.goto('/'),
    ]);

    const [response] = await Promise.all([
      page.waitForResponse((res) =>
        res.url().includes('/api/dogs/random') && res.status() === 200
      ),
      page.click('button.fetch-button'),
    ]);

    expect(response.status()).toBe(200);

    const dogImage = page.locator('img[alt="Random dog"]');
    await dogImage.waitFor({ state: 'visible' });

    const src = await dogImage.getAttribute('src');
    expect(src).toBeTruthy();

    expect(src).toMatch(/^https:\/\//);
  });

  // Test 5
  test('should display an error when the API call fails', async ({ page }) => {
    await page.route('**/api/dogs/random', (route) => route.abort());

    await page.goto('/');

    const errorElement = page.getByText(/error/i);
    await errorElement.waitFor({ state: 'visible' });

    expect(await errorElement.isVisible()).toBe(true);
  });
});
