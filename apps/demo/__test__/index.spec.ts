import { test, expect } from '@playwright/test'

test('should be able to create a canvas', async ({ page }) => {
  await page.goto('http://localhost:8080/')

  const canvas = page.locator('sketcha-canvas')
  await expect(canvas).toBeVisible()
})

test('should be able to draw a line on the canvas', async ({ page }) => {
  await page.goto('http://localhost:8080/')
  const canvas = page.locator('sketcha-canvas')
  const box = await canvas.boundingBox()
  if (box) {
    await page.mouse.move(box.x + 10, box.y + 10)
    await page.mouse.down()
    await page.mouse.move(box.x + 100, box.y + 100)
    await page.mouse.up()
    await page.waitForTimeout(2000) // 2초간 대기하여 눈으로 확인 가능
  }
})

test('should be able to draw multiple lines on the canvas', async ({ page }) => {
  await page.goto('http://localhost:8080/')
  const canvas = page.locator('sketcha-canvas')
  const box = await canvas.boundingBox()
  if (box) {
    // 첫 번째 선
    await page.mouse.move(box.x + 20, box.y + 20)
    await page.mouse.down()
    await page.mouse.move(box.x + 120, box.y + 20)
    await page.mouse.up()
    await page.waitForTimeout(1000)

    // 두 번째 선
    await page.mouse.move(box.x + 20, box.y + 40)
    await page.mouse.down()
    await page.mouse.move(box.x + 120, box.y + 40)
    await page.mouse.up()
    await page.waitForTimeout(1000)

    // 세 번째 선
    await page.mouse.move(box.x + 20, box.y + 60)
    await page.mouse.down()
    await page.mouse.move(box.x + 120, box.y + 60)
    await page.mouse.up()
    await page.waitForTimeout(1000)
  }
})
