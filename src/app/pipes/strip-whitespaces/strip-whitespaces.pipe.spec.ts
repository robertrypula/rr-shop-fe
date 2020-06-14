import { StripWhitespacesPipe } from './strip-whitespaces.pipe';

describe('StripWhitespacesPipe', () => {
  it('create an instance', () => {
    const pipe = new StripWhitespacesPipe();
    expect(pipe).toBeTruthy();
  });
});
