import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('toont de pagina met een lege lijst', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Takenlijst' })).toBeVisible();
  await expect(page.locator('#counter')).toHaveText('0 open taken');
});

test('taak toevoegen, afvinken en verwijderen', async ({ page }) => {
  await page.getByLabel('Nieuwe taak').fill('Pipeline bouwen');
  await page.getByRole('button', { name: 'Toevoegen' }).click();

  await expect(page.locator('#task-list li')).toHaveCount(1);
  await expect(page.locator('#counter')).toHaveText('1 open taak');

  await page.getByLabel('Afvinken: Pipeline bouwen').check();
  await expect(page.locator('#task-list li')).toHaveClass(/done/);
  await expect(page.locator('#counter')).toHaveText('0 open taken');

  await page.getByRole('button', { name: 'Verwijder: Pipeline bouwen' }).click();
  await expect(page.locator('#task-list li')).toHaveCount(0);
});

test('lege invoer geeft een foutmelding', async ({ page }) => {
  await page.getByRole('button', { name: 'Toevoegen' }).click();
  await expect(page.getByRole('alert')).toHaveText('Vul een taak in.');
  await expect(page.locator('#task-list li')).toHaveCount(0);
});

test('taken blijven bewaard na herladen', async ({ page }) => {
  await page.getByLabel('Nieuwe taak').fill('Blijft staan');
  await page.getByRole('button', { name: 'Toevoegen' }).click();
  await page.reload();
  await expect(page.getByText('Blijft staan')).toBeVisible();
});
