// tslint:disable-next-line:no-implicit-dependencies
import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('cosmic-app h1')).getText();
  }
}
