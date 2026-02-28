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

  //Тест: Прилагане на подаръчен ваучер, който покрива повече от крайната сума
  test('Прилагане на подаръчен ваучер по-голям от крайната сума', async ({ page }) => {
    //Локатор за полето за ваучер
    const giftInput = page.locator('input[name="gift"]');
    //Проверка, че полето е видимо
    await expect(giftInput).toBeVisible();
    //Въвеждаме ваучер на стойност 1000 евро
    await giftInput.fill('1000');
    await page.waitForTimeout(500);

    //Локатор за бутона за прилагане ваучера
    const applyGiftBtn = page.locator('button[name="apply_gift"]');
    //Проверка, че бутонът е видим
    await expect(applyGiftBtn).toBeVisible();
    //Кликваме върху бутона, за да приложим ваучера
    await applyGiftBtn.click();
    await page.waitForTimeout(500);

    //Локатор за елемента с крайната сума
    const finalTotal = page.locator('.total');
    //Проверка, че крайната сума се актуализира правилно
    await expect(finalTotal).toHaveText(/€ 0.00/);
  });
});