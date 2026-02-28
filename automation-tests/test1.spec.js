//@ts-check
import { test, expect } from '@playwright/test';

//Създаваме група от тестове с describe
test.describe('Зареждане на страницата преди всеки тест', () => {

  //beforeEach ще се изпълнява преди всеки тест в тази група
  test.beforeEach(async ({page}) => {
    //Зареждаме страницата с менюто (/home)
    await page.goto('https://hacknatsait.com/u5/home', {
      waitUntil: 'domcontentloaded'
    });

    //Малка пауза за визуализация на действията
    await page.waitForTimeout(500);

    //Селектор за пицата Маргарита на страницата
    const pizzaCard = page.locator('text=Пица Маргарита');
    //Проверка, че пицата е видима на екрана
    await expect(pizzaCard).toBeVisible();
    //Кликваме върху бутона "Добави в кошницата" вътре в родителския контейнер
    await pizzaCard.locator('xpath=..').locator('text=Добави в кошницата').click();
    //Пауза след клик за визуално наблюдение
    await page.waitForTimeout(500);

    //Отиваме на страницата на количката (/checkout)
    await page.goto('https://hacknatsait.com/u5/checkout');
    //Пауза за зареждане и визуализация
    await page.waitForTimeout(500);
  });

  //Тест: Проверка дали пицата е в количката
  test('Пицата Маргарита е в количката', async ({ page }) => {
    //Локатор за елемента с пицата в кошницата
    const cartItem = page.locator('text=Пица Маргарита');
    //Проверка, че пицата действително присъства в кошницата
    await expect(cartItem).toBeVisible();
  });
});