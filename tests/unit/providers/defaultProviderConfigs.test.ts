import { getBuiltInProviderDefaultConfigs } from '@/providers/defaultProviderConfigs';

describe('getBuiltInProviderDefaultConfigs', () => {
  it('returns fresh built-in provider config objects', () => {
    const first = getBuiltInProviderDefaultConfigs();
    const second = getBuiltInProviderDefaultConfigs();

    expect(Object.keys(first)).toEqual(['grok']);
    expect(first.grok).toMatchObject({ enabled: true });
    expect(first).not.toBe(second);
    expect(first.grok).not.toBe(second.grok);
  });
});
