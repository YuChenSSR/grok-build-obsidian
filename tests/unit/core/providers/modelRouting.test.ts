import '@/providers';

import { getEnabledProviderForModel, getProviderForModel } from '@/core/providers/modelRouting';
import { encodeGrokModelId, GROK_DEFAULT_MODEL_ID } from '@/providers/grok/models';

describe('getProviderForModel', () => {
  it('routes Grok model selections to grok', () => {
    expect(getProviderForModel('grok')).toBe('grok');
    expect(getProviderForModel(encodeGrokModelId(GROK_DEFAULT_MODEL_ID))).toBe('grok');
    expect(getProviderForModel('grok:grok-composer-2.5-fast')).toBe('grok');
  });

  it('routes unknown models to grok as the only built-in provider', () => {
    expect(getProviderForModel('some-unknown-model')).toBe('grok');
    expect(getProviderForModel('claude-sonnet-4-5-20250514')).toBe('grok');
    expect(getProviderForModel('gpt-4o')).toBe('grok');
  });

  it('resolves within enabled providers to grok', () => {
    const settings = {
      providerConfigs: {
        grok: {
          enabled: true,
        },
      },
    };

    expect(getEnabledProviderForModel(encodeGrokModelId(GROK_DEFAULT_MODEL_ID), settings)).toBe('grok');
    expect(getEnabledProviderForModel('some-unknown-model', settings)).toBe('grok');
  });

  it('falls back to grok when saved settings reference a legacy provider', () => {
    const settings = {
      settingsProvider: 'claude',
      providerConfigs: {
        grok: {
          enabled: true,
        },
      },
    };

    expect(getEnabledProviderForModel('claude-sonnet-4-5-20250514', settings)).toBe('grok');
  });
});
