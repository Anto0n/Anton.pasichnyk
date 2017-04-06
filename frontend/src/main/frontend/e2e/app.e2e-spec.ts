import { Cot2bootPage } from './app.po';

describe('cot2boot App', function() {
  let page: Cot2bootPage;

  beforeEach(() => {
    page = new Cot2bootPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
