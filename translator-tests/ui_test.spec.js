const { test, expect } = require('@playwright/test');

test.describe('UI Test', () => {
  
  test('Pos_UI_0001 - Real-time typing updates', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
    
    const inputBox = page.locator('input, textarea').first();
    await inputBox.click();
    await inputBox.fill('');
    
    
    const text = 'mama type karagena inne';
    for (let i = 0; i < text.length; i++) {
      await inputBox.type(text[i], { delay: 200 });
      await page.waitForTimeout(100);
      
    
      const outputBox = page.locator('input, textarea').nth(1);
      const currentOutput = await outputBox.inputValue();
      console.log(`Typed "${text[i]}", Output so far: ${currentOutput}`);
    }
    
    await page.waitForTimeout(2000);
    
    const outputBox = page.locator('input, textarea').nth(1);
    const finalOutput = await outputBox.inputValue();
    console.log('Final Output:', finalOutput);
    
    expect(finalOutput).toBeTruthy();
    expect(finalOutput).toMatch(/[අ-෴]/);
  });
});