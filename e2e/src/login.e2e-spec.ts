// import { AppPage } from './app.po';
import { browser, by, element, ExpectedConditions } from 'protractor';

describe('Ashe Pashe App -', () => {

  beforeEach(() => {
  });

  describe('login screen', () => {
    beforeEach(async () => {
      browser.get('/auth/sign-in');
      await browser.waitForAngular();
    });

    it('fails on wrong email', async () => {
      expect(await element(by.id('sign-in-email')).isPresent()).toBe(true);

      await element(by.css('#sign-in-email > input')).sendKeys('asddasads');
      expect(await element(by.css('#sign-in-email > input')).getAttribute('value')).toBe('asddasads'); // to verify if the above line worked

      await element(by.css('#sign-in-password > input')).sendKeys('asddasads');
      expect(await element(by.css('#sign-in-password > input'))
        .getAttribute('value')).toBe('asddasads');

      await element(by.className('sign-in--cta')).click();
      await browser.waitForAngular();

      browser.wait(ExpectedConditions.visibilityOf(await element(by.id('sign-in-message'))), 2000);

      expect(await element(by.id('sign-in-message')).getText()).toBe('You made some mistake! Shame Shame');
    });

    it('works on correct email', async () => {
      expect(await element(by.id('sign-in-email')).isPresent()).toBe(true);

      await element(by.css('#sign-in-email > input')).sendKeys('adhar');
      expect(await element(by.css('#sign-in-email > input')).getAttribute('value')).toBe('adhar'); // to verify if the above line worked

      await element(by.css('#sign-in-password > input')).sendKeys('alooo');
      expect(await element(by.css('#sign-in-password > input'))
        .getAttribute('value')).toBe('alooo');

      await element(by.className('sign-in--cta')).click();
      await browser.waitForAngular();

      await browser.wait(ExpectedConditions.urlContains('dashboard'), 3000);

      expect(await browser.getCurrentUrl()).toContain('dashboard');
    });
  });
});
