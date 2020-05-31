import { QuantityTextPipe } from './quantity-text.pipe';

describe('QuantityTestPipe', () => {
  it('create an instance', () => {
    const pipe = new QuantityTextPipe();
    expect(pipe).toBeTruthy();
  });
});
