import { browser, element, by, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Ashe Pashe App - ', () => {
  describe('profile page', () => {
    beforeEach(async () => {
      await browser.get('/auth/sign-in');
      await browser.waitForAngular();
      await element(by.css('#sign-in-email > input')).sendKeys('adhar');
      await element(by.css('#sign-in-password > input')).sendKeys('alooo');
      await element(by.className('sign-in--cta')).click();

      await browser.waitForAngular();

      await browser.wait(ExpectedConditions.visibilityOf(element(by.id('dashboard-menu-icon'))), 3000);

      await element(by.id('dashboard-menu-icon')).click();

      await browser.wait(ExpectedConditions.visibilityOf(element(by.id('menu-item-profile'))), 3000);

      await element(by.id('menu-item-profile')).click();

      await browser.wait(ExpectedConditions.visibilityOf(element(by.id('profile-page-title'))), 3000);
    });

    it('loads up properly', async () => {
      expect(await browser.getCurrentUrl()).toContain('ashe-pashe/profile');

      expect(await element(by.id('profile-page-title')).getText()).toBe('Profile');

      expect(await element(by.id('profile-page-avatar')).getAttribute('src')).toBe('https://robohash.org/Aloo%20Man');

      expect(await element(by.id('profile-page-created-on')).getText()).toBe('Profile created on 8/24/20');

      expect(await element(by.css('#profile-page-fullname > input')).getAttribute('value')).toBe('Aloo Man');

      expect(await element(by.css('#profile-page-email > input')).getAttribute('value')).toBe('aloo@aloo.com');

      expect(await ExpectedConditions.visibilityOf(element(by.id('profile-page-save')))()).toBe(true);

      expect(await ExpectedConditions.visibilityOf(element(by.id('profile-page-reset')))()).toBe(true);
    });

    it('reset works properly', async () => {
      await element(by.css('#profile-page-fullname > input')).clear();
      await element(by.css('#profile-page-fullname > input')).sendKeys('qwjeioqwjeiqje');

      await element(by.css('#profile-page-email > input')).clear();
      await element(by.css('#profile-page-email > input')).sendKeys('alsdkalsdk');

      expect(await element(by.css('#profile-page-fullname > input')).getAttribute('value')).toBe('qwjeioqwjeiqje');
      expect(await element(by.css('#profile-page-email > input')).getAttribute('value')).toBe('alsdkalsdk');

      await element(by.id('profile-page-reset')).click();

      expect(await element(by.css('#profile-page-fullname > input')).getAttribute('value')).toBe('Aloo Man');
      expect(await element(by.css('#profile-page-email > input')).getAttribute('value')).toBe('aloo@aloo.com');
    });
  });
});
