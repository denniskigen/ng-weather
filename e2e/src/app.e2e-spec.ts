import { AppPage } from './app.po';

describe('workspace-project ngWeather', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app title', () => {
    page.navigateTo();
    console.log('page: ', page);
    expect(page.getParagraphText()).toEqual('ngWeather');
  });
});
