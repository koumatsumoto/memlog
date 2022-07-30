import { fromBase64, toBase64 } from './functions';

test('toBase64', () => {
  expect(fromBase64(toBase64('a'))).toBe('a');
  expect(fromBase64(toBase64('日本語'))).toBe('日本語');
});
