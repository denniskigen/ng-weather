import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string when passed a null value as its argument', () => {
    const value = null;
    expect(pipe.transform(value)).toEqual('');
  });

  it('should return a transformed version of a non-null string with the first character converted to uppercase', () => {
    const value = 'random string';
    expect(pipe.transform(value)).toEqual('Random string');
  });
});
