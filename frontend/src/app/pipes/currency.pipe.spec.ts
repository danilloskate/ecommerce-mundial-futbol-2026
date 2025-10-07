import { ColombianCurrencyPipe } from './currency.pipe';

describe('ColombianCurrencyPipe', () => {
  let pipe: ColombianCurrencyPipe;

  beforeEach(() => {
    pipe = new ColombianCurrencyPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format number to Colombian pesos', () => {
    expect(pipe.transform(350000)).toContain('350.000');
    expect(pipe.transform(520000)).toContain('520.000');
    expect(pipe.transform(1000)).toContain('1.000');
  });

  it('should handle zero value', () => {
    expect(pipe.transform(0)).toBe('$0');
  });

  it('should handle large numbers', () => {
    expect(pipe.transform(1000000)).toContain('1.000.000');
    expect(pipe.transform(2500000)).toContain('2.500.000');
  });
});