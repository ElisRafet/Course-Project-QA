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

  //Тест: Добавяне на код за отстъпка и проверка на крайната сума
  test('Прилагане на код за отстъпка SAVE20 и проверка на крайна сума', async ({ page }) => {
    //Локатор за полето за код за отстъпка
    const discountInput = page.locator('input[name="coupon"]');
    //Проверка, че полето е видимо
    await expect(discountInput).toBeVisible();
    //Въвеждаме кода за отстъпка "SAVE20"
    await discountInput.fill('SAVE20');

    //Локатор за бутона за прилагане на кода
    const applyBtn = page.locator('button[name="apply_coupon"]');
    //Проверка, че бутонът е видим
    await expect(applyBtn).toBeVisible();
    //Кликваме върху бутона, за да приложим кода
    await applyBtn.click();

    //Локатор за елемента с крайната сума
    const finalTotal = page.locator('.total');
    //Проверка, че крайната сума се актуализира правилно
    await expect(finalTotal).toHaveText(/€ 15.34/);
  });
});