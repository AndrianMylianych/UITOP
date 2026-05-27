import { expect, request, test } from '@playwright/test';

const API_BASE = 'https://automationexercise.com';

test.describe('API Tests - AutomationExercise', () => {
  // ─── Positive scenarios ────────────────────────────────────────────────────

  test('TC-API-001: GET /api/productsList returns responseCode 200 and a products array', async () => {
    const ctx = await request.newContext({ baseURL: API_BASE });

    const response = await ctx.get('/api/productsList');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('responseCode', 200);
    expect(body).toHaveProperty('products');
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    const firstProduct = body.products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('category');

    await ctx.dispose();
  });

  test('TC-API-002: GET /api/brandsList returns responseCode 200 and a brands array', async () => {
    const ctx = await request.newContext({ baseURL: API_BASE });

    const response = await ctx.get('/api/brandsList');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('responseCode', 200);
    expect(body).toHaveProperty('brands');
    expect(Array.isArray(body.brands)).toBe(true);
    expect(body.brands.length).toBeGreaterThan(0);

    const firstBrand = body.brands[0];
    expect(firstBrand).toHaveProperty('id');
    expect(firstBrand).toHaveProperty('brand');

    await ctx.dispose();
  });

  test('TC-API-003: POST /api/searchProduct with valid param returns matching products', async () => {
    const ctx = await request.newContext({ baseURL: API_BASE });

    const response = await ctx.post('/api/searchProduct', {
      form: { search_product: 'top' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('responseCode', 200);
    expect(body).toHaveProperty('products');
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    await ctx.dispose();
  });

  // ─── Negative scenarios ────────────────────────────────────────────────────

  test('TC-API-004: POST /api/productsList returns responseCode 405 (method not supported)', async () => {
    const ctx = await request.newContext({ baseURL: API_BASE });

    const response = await ctx.post('/api/productsList');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('responseCode', 405);
    expect(body.message).toMatch(/not supported/i);

    await ctx.dispose();
  });

  test('TC-API-005: POST /api/searchProduct without search_product param returns responseCode 400', async () => {
    const ctx = await request.newContext({ baseURL: API_BASE });

    const response = await ctx.post('/api/searchProduct');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('responseCode', 400);
    expect(body.message).toMatch(/missing/i);

    await ctx.dispose();
  });

  test('TC-API-006: PUT /api/brandsList returns responseCode 405 (method not supported)', async () => {
    const ctx = await request.newContext({ baseURL: API_BASE });

    const response = await ctx.put('/api/brandsList');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('responseCode', 405);
    expect(body.message).toMatch(/not supported/i);

    await ctx.dispose();
  });

  test('TC-API-007: POST /api/verifyLogin with invalid credentials returns responseCode 404', async () => {
    const ctx = await request.newContext({ baseURL: API_BASE });

    const response = await ctx.post('/api/verifyLogin', {
      form: { email: 'invalid@example.com', password: 'wrongpassword123' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('responseCode', 404);
    expect(body.message).toBe('User not found!');

    await ctx.dispose();
  });
});
