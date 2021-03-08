import { AppPage } from './app.po';
import { logging } from 'protractor';
import { browser, ExpectedConditions as until } from 'protractor';

import { LoginPage } from './page-objects/login.po';

describe('workspace-project App', () => {
  let page: AppPage;
  const login = new LoginPage();

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();

    it('should display the login page', async () => {
      expect(await browser.getCurrentUrl()).toContain('/login');
    });

    afterEach(async () => {
      // Assert that there are no errors emitted from the browser
      const logs = await browser.manage().logs().get(logging.Type.BROWSER);
      expect(logs).not.toContain(
        jasmine.objectContaining({
          level: logging.Level.SEVERE,
        } as logging.Entry)
      );
    });
  });
});
