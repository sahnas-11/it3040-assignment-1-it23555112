const { test, expect } = require('@playwright/test');

test.describe('Negative Functional Tests - Singlish to Sinhala', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
  });

  async function typeAndGetOutput(page, text) {
    const inputBox = page.locator('input, textarea').first();
    await inputBox.click();
    await inputBox.fill(text);
    await page.waitForTimeout(2000);
    
    const outputBox = page.locator('input, textarea').nth(1);
    return await outputBox.inputValue();
  }

  // Neg_Fun_0001
  test('Neg_Fun_0001 - exlamation mark should not translate', async ({ page }) => {
    const inputText = ' ha eka hari!';
    const output = await typeAndGetOutput(page, inputText);
    console.log('Neg_Fun_0001 Output:', output);
    
    // Should contain untranslated "bro"
    expect(output).toContain('bro');
  });

  // Neg_Fun_0002
  test('Neg_Fun_0002 - 199 shouldnt transalate ', async ({ page }) => {
    const inputText = '199 call karanna';
    const output = await typeAndGetOutput(page, inputText);
    console.log('Neg_Fun_0002 Output:', output);
    
    expect(output).toContain('lol');
  });

  // Neg_Fun_0003
  test('Neg_Fun_0003 - ', async ({ page }) => {
    const inputText = 'mama aluth edhum gattha!';
    const output = await typeAndGetOutput(page, inputText);
    console.log('Neg_Fun_0003 Output:', output);
    
    expect(output).toContain('tysm');
  });

  // Neg_Fun_0004
  test('Neg_Fun_0004 - BRB abbreviation mixed', async ({ page }) => {
    const inputText = 'ekey mila rupiyal rs1000';
    const output = await typeAndGetOutput(page, inputText);
    console.log('Neg_Fun_0004 Output:', output);
    
    expect(output).toContain('BRB');
  });

  // Neg_Fun_0005
  test('Neg_Fun_0005 - OMG reaction unchanged', async ({ page }) => {
    const inputText = 'ammo! eka hodha movie ekak';
    const output = await typeAndGetOutput(page, inputText);
    console.log('Neg_Fun_0005 Output:', output);
    
    expect(output).toContain('omg');
  });

  // Neg_Fun_0006
  test('Neg_Fun_0006 - URL instruction with English', async ({ page }) => {
    const inputText = 'URL eka copy karala paste karanna';
    const output = await typeAndGetOutput(page, inputText);
    console.log('Neg_Fun_0006 Output:', output);
    
    expect(output).toContain('URL');
  });

  // Neg_Fun_0007
  test('Neg_Fun_0007 - WiFi password question', async ({ page }) => {
    const inputText = 'wifi password eka kohomadha dhagatthey';
    const output = await typeAndGetOutput(page, inputText);
    console.log('Neg_Fun_0007 Output:', output);
    
    expect(output).toContain('wifi');
  });

  // Neg_Fun_0008
  test('Neg_Fun_0008 - Streaming service brands unchanged', async ({ page }) => {
    const inputText = 'netflix ge subscription ekak gatta Disney+ ekka';
    const output = await typeAndGetOutput(page, inputText);
    console.log('Neg_Fun_0008 Output:', output);
    
    expect(output).toContain('netflix');
  });

  // Neg_Fun_0009
  test('Neg_Fun_0009 - Very short English input', async ({ page }) => {
    const inputText = 'mama paaasal yanawa';
    const output = await typeAndGetOutput(page, inputText);
    console.log('Neg_Fun_0009 Output:', output);
    
    expect(output).toBeTruthy();
  });

  // Neg_Fun_0010
  test('Neg_Fun_0010 - Informal hesitation sound', async ({ page }) => {
    const inputText = 'mata mahansi + vathura thibahai';
    const output = await typeAndGetOutput(page, inputText);
    console.log('Neg_Fun_0010 Output:', output);
    
    expect(output).toBeTruthy();
  });
});