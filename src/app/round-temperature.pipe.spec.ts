import { RoundTemperaturePipe } from './round-temperature.pipe';

describe('RoundTemperaturePipe', () => {
  let pipe: RoundTemperaturePipe;

  beforeEach(() => {
    pipe = new RoundTemperaturePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should returns the value of the number passed to it rounded to the nearest integer', () => {
    let value = 19.38;
    expect(pipe.transform(value)).toEqual(19);
    value = 25.0;
    expect(pipe.transform(value)).toEqual(25);
    value = 28.51;
    expect(pipe.transform(value)).toEqual(29);
  });
});
