import { ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class Helpers {
    private constructor() {
    }

    public static async clearIonInput(el: ElementFinder) {
        const textLength = (await el.getAttribute('value')).length;
        if (textLength) {
            for (let index = 0; index < textLength; index++) {
                await el.sendKeys(protractor.Key.BACK_SPACE);
            }
        }
    }
}
