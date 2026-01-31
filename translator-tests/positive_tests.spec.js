const { test, expect } = require('@playwright/test');

test.describe('Positive Functional Tests - Singlish to Sinhala', () => {

  test.beforeEach(async ({ page }) => {
    // Navigates to the translator website before each test
    await page.goto('https://www.swifttranslator.com/translator.html');
    await page.waitForLoadState('networkidle');
  });

  // Helper function to trigger translation
  async function triggerTranslation(page) {
    // Add and remove spaces to trigger processing
    await page.keyboard.press('Space');
    await page.keyboard.press('Backspace');
    // Wait a bit for processing
    await page.waitForTimeout(1000);
  }

  // Helper function to check translation
  async function checkTranslation(page, expectedSinhalaWords) {
    // Wait for Sinhala text to appear
    for (const word of expectedSinhalaWords) {
      await expect(page.locator('body')).toContainText(word, { timeout: 20000 });
    }
  }

  // Helper function to fill input and check translation
  async function testTranslation(page, inputText, expectedWords) {
    const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    
    await inputBox.click();
    await page.keyboard.type(inputText, { delay: 100 });
    
    await triggerTranslation(page);
    await checkTranslation(page, expectedWords);
  }

  // Pos_Fun_0001
  test('Pos_Fun_0001 - converts a simple present tense', async ({ page }) => {
    await testTranslation(page, 'mata ada pothak kiyavanna thiyanava', ['මට අද පොතක් කියවන්න තියනවා']);
  });

  // Pos_Fun_0002
  test('Pos_Fun_0002 - converts a simple compliment', async ({ page }) => {
    await testTranslation(page, ' eyaa hoDHA guruvarayaa', [' eyaa hoDHA guruvarayaa']);
  });

  // Pos_Fun_0003
  test('Pos_Fun_0003 - converts a complex sentetnce', async ({ page }) => {
    await testTranslation(page, 'machan science fiction book ekak recommend karanna', 
      ['මචන් science fiction book එකක් recommend කරන්න පුළුවන්']);
  });

  // Pos_Fun_0004
  test('Pos_Fun_0004 - converts a simple request', async ({ page }) => {
    await testTranslation(page, 'api mea weekend cinema ekak balanna yanavaa', 
      ['අපි මේ weekend cinema එකක් බලන්න යනවා']);
  });

  // Pos_Fun_0005
  test('Pos_Fun_0005 - converts an interrogative question', async ({ page }) => {
    await testTranslation(page, 'Meaka kohen gaththe?', ['මේක', 'කොහෙන්', 'ගත්තෙ?']);
  });

  // Pos_Fun_0006
  test('Pos_Fun_0006 - converts an emotion', async ({ page }) => {
    await testTranslation(page, 'Nolan ge films mata maara aasayi', ['Nolan ගෙ films මට මාර ආසයි']);
  });

  // Pos_Fun_0007
  test('Pos_Fun_0007 - converts negative sentences', async ({ page }) => {
    await testTranslation(page, 'Mama vaeradhi karanne naehae', ['මම', 'වැරදි', 'කරන්නේ', 'නැහැ']);
  });

  // Pos_Fun_0008
  test('Pos_Fun_0008 - converts compound sentence', async ({ page }) => {
    await testTranslation(page, 'trailer eka baeluvaa, eka maru', ['trailer එක බැලුවා, එක මරු']);
  });

  // Pos_Fun_0009
  test('Pos_Fun_0009 - converts an informal sentence', async ({ page }) => {
    await testTranslation(page, 'machan cafe ekakata mama yanna hadhanavaa', ['මචන් cafe එකකට මම යන්න හදනවා']);
  });

  // Pos_Fun_0010
  test('Pos_Fun_0010 - converts a past tense', async ({ page }) => {
    await testTranslation(page, 'mama subtitles nethuva film ekak baeluvaa', ['මම subtitles නෙතුව film එකක් බැලුවා']);
  });

  // Pos_Fun_0011
  test('Pos_Fun_0011 - converts a simple sentence', async ({ page }) => {
    await testTranslation(page, 'api photos tikak gannavaa', 
      ['අපි photos ටිකක් ගන්නවා']);
  });

  // Pos_Fun_0012
  test('Pos_Fun_0012 - converts past tense sentences', async ({ page }) => {
    await testTranslation(page, 'Api iiyee gamanak giyaa', ['අපි', 'ඊයේ', 'ගමනක්', 'ගියා']);
  });

  // Pos_Fun_0013
  test('Pos_Fun_0013 - converts a compound sentence', async ({ page }) => {
    await testTranslation(page, 'heta dhina ammaa saha mama rohalata beheth ganna yannemu', 
      ['හෙට දින අම්මා  සහ මම රොහලට බෙහෙත් ගන්න යන්නෙමු']);
  });

  // Pos_Fun_0014
  test('Pos_Fun_0014 - converts a present contnous sentence', async ({ page }) => {
    await testTranslation(page, 'adha apea nivasea thiintha aaleapanaya karamin sitiya', ['අද අපේ නිවසේ තීන්ත ආලේපනය කරමින් සිටිය']);
  });

  // Pos_Fun_0015
  test('Pos_Fun_0015 - converts mixed singlish and english terms', async ({ page }) => {
    await testTranslation(page, 'api dhennaa ekata yanna hithenava Italian restaurant ekakata', 
      ['ඔයා', 'email', 'එක', 'බලුවාද?']);
  });

  // Pos_Fun_0016
  test('Pos_Fun_0016 - converts sentence with place name', async ({ page }) => {
    await testTranslation(page, 'adha apita SLIIT Ekee exams thiyanavaadha?', 
      ['අපි දෙන්නා එකට යන්න හිතෙනව Italian restaurant එකකට?']);
  });

  // Pos_Fun_0017
  test('Pos_Fun_0017 - converts common english word usuage', async ({ page }) => {
    await testTranslation(page, 'Sunday morning hiking ekata yanna hithenavaa upcountry area ekakata', 
      ['සුභ', 'Sunday morning hiking එකට යන්න හිතෙනවා upcountry area එකකට']);
  });

  // Pos_Fun_0018
  test('Pos_Fun_0018 - converts a simple sentence', async ({ page }) => {
    await testTranslation(page, 'ama aluth laptop ekak ganna hithenavaa gaming laptop ekak', 
      ['මම අලුත් laptop එකක් ගන්න හිතෙනවා gaming laptop එකක්']);
  });

  // Pos_Fun_0019
  test('Pos_Fun_0019 - converts a simple sentence', async ({ page }) => {
    await testTranslation(page, 'camera quality hariyata vaeda karanavaa', 
      ['camera quality හරියට වැඩ කරනවා']);
  });

  // Pos_Fun_0020
  test('Pos_Fun_0020 - converts a english mix sentence', async ({ page }) => {
    await testTranslation(page, 'app eka update karanna ona', 
      ['app එක update කරන්න ඔන']);
  });

  // Pos_Fun_0021
  test('Pos_Fun_0021 - converts multi-line input', async ({ page }) => {
    const inputText = `Mama pihinanna yanavaa,
oyaa enavadha?`;
    const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    
    await inputBox.click();
    await page.keyboard.type(inputText, { delay: 100 });
    
    await triggerTranslation(page);
    
    await checkTranslation(page, ['මම', 'පිහිනන්න', 'යනවා', 'ඔයා', 'එනවද?']);
  });

  // Pos_Fun_0022
  test('Pos_Fun_0022 - converts english and compund sentence', async ({ page }) => {
    await testTranslation(page, 'mechanical keyboards ganan vaedi haebayi typing eka hari naee', 
      ['a mechanical keyboards ගනන් වැඩි හැබයි typing එක හරි නෑ']);
  });

  // Pos_Fun_0023
  test('Pos_Fun_0023 - converts a daily usage word of tech', async ({ page }) => {
    await testTranslation(page, 'mama code eka debug karagena inne error tikak thiyanavaa', 
      ['මම code එක debug කරගෙන ඉන්නේ error ටිකක් තියනවා']);
  });

  // Pos_Fun_0024
  test('Pos_Fun_0024 - converts a future tense', async ({ page }) => {
    await testTranslation(page, 'mama aluth laptop ekak ganna hithenavaa gaming laptop ekak', 
      ['මම අලුත් laptop එකක් ගන්න හිතෙනවා gaming laptop එකක්']);
  });
});