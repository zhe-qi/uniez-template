import { describe, expect, it } from 'vitest';
import { formatDate } from '../src/utils/utility/utils';

describe('uni-app test', () => {
  it('should have uni object', () => {
    // @ts-expect-error 忽略类型错误
    expect(window.uni).toBeDefined();
    // @ts-expect-error 忽略类型错误
    expect(uni).toBeDefined();
  });
});

describe('formatDate', () => {
  it('should format date', () => {
    expect(formatDate('2021-01-01')).toBe('2021-01-01 00:00:00');
  });
});
