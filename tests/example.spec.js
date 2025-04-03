// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('Accedo a la PDP con el search', async ({ page }) => {
  await page.goto('https://www.loewe.com/eur/en/home');
  await page.waitForTimeout(1000); // Pause for 1 second
  await page.locator('.css-w48aea.edafrmd4').click();
  await page.waitForTimeout(1000); // Pause for 1 second
  await page.getByPlaceholder('Buscar').fill('bolso');
  await page.waitForTimeout(8000); // Pause for 1 second

  const cookiesPopup = page.locator('#onetrust-accept-btn-handler'); // Updated selector for the accept button
  if (await cookiesPopup.isVisible()) {
    await cookiesPopup.click();
    await page.waitForTimeout(3000); // Pause for 1 second after accepting cookies
  }
  await page.getByText('Bolso Puzzle pequeño en piel de ternera Burdeos Oscuro').click();
  await page.waitForTimeout(2000); // Pause for 2 seconds
  await expect(page).toHaveURL('https://www.loewe.com/eur/es/mujer/bolsos/puzzle/bolso-puzzle-pequeno-en-piel-de-ternera/A510S21XAE-7240.html');
});

test('Accedo a la PLP con el search', async ({ page }) => {
  await page.goto('https://www.loewe.com/eur/en/home', { waitUntil: 'load' });
  await page.locator('.css-w48aea.edafrmd4').click();
  await page.waitForLoadState('load'); 
  await page.getByPlaceholder('Buscar').fill('bolso');
 

  const cookiesPopup = page.locator('#onetrust-accept-btn-handler'); 
  await cookiesPopup.waitFor({ state: 'visible', timeout: 8000 }); 
  if (await cookiesPopup.isVisible()) {
    await cookiesPopup.click();
  }
  await page.getByTestId('header-search-submit-button').click();
  await page.waitForURL('https://www.loewe.com/eur/es/search?q=bolso', { waitUntil: 'load' });
});