import { browser, element, by, ExpectedConditions } from 'protractor';
import { Helpers } from './helpers';

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
        });

        it('check if camera works', async () => {
            await element(by.id('dashboard-camera')).click();

            expect((await element(by.id('dashboard-camera-preview')).getAttribute('src')).length).toBe(0);

            await browser.driver.selectContext((await browser.driver.listContexts())[0]);

            await (await browser.driver.findElement({ xpath: '//android.view.View[@content-desc="Shutter button"]' })).click();


            await browser.sleep(3000);

            await (await browser.driver.findElement({ xpath: '//android.widget.ImageView[@content-desc="Done"]' })).click();

            await browser.sleep(3000);

            await browser.driver.selectContext((await browser.driver.listContexts())[1]);

            await browser.sleep(3000);

            expect((await element(by.id('dashboard-camera-preview')).getAttribute('src')).length).toBeGreaterThan(10);
        });
    });
});

