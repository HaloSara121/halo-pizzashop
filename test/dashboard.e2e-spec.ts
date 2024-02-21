import { expect, test } from '@playwright/test'

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('20', { exact: true })).toBeVisible()
  await expect(page.getByText('-4% em relação a ontem')).toBeVisible()
})

test('display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('120', { exact: true })).toBeVisible()
  await expect(page.getByText('+20% em relação ao mês passado')).toBeVisible()
})

test('display month canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('10', { exact: true })).toBeVisible()
  await expect(page.getByText('-2% em relação ao mês passado')).toBeVisible()
})

test('display month revenue metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('R$ 233,09', { exact: true })).toBeVisible()
  await expect(page.getByText('+8% em relação a ontem')).toBeVisible()
})
