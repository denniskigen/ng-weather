import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should have a transform method defined', () => {
    expect(pipe.transform).toBeDefined();
  });

  it('should return an empty string when passed a null value as its argument', () => {
    const value = null;
    const result = pipe.transform(value);
    expect(result).toEqual('');
  });

  it('should return a transformed version of a non-null string with the first character converted to uppercase', () => {
    const value = 'random string';
    const result = pipe.transform(value);
    expect(result).toEqual('Random string');
  });
});
