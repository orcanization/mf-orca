import { apiClient } from '@/api/api-utils';
import type { Plugin } from '@/api/models';
import type { ModuleFederation } from '@module-federation/runtime';
import type { ComponentType } from 'react';

export function loadRemotePlugins(
  mfInstance: ModuleFederation,
  plugins: Plugin[],
) {
  const remotes = plugins.map(plugin => {
    const entryUrl = apiClient().getPluginUrl(plugin);
    return {
      name: plugin.id.toString(),
      alias: plugin.name,
      entry: entryUrl,
    };
  });
  mfInstance.registerRemotes(remotes);
}

export function isRenderableComponent(value: unknown): value is ComponentType {
  return (
    typeof value === 'function' ||
    (typeof value === 'object' && value !== null && '$$typeof' in value)
  );
}

export function resolveRemoteComponent(module: unknown): ComponentType | null {
  if (typeof module === 'function' || isRenderableComponent(module)) {
    return module as ComponentType;
  }

  if (!module || typeof module !== 'object') {
    return null;
  }

  const moduleRecord = module as Record<string, unknown>;
  console.log(moduleRecord);
  const defaultExport = moduleRecord.default;

  if (isRenderableComponent(defaultExport)) {
    return defaultExport as ComponentType;
  }

  if (
    defaultExport &&
    typeof defaultExport === 'object' &&
    'Component' in defaultExport &&
    isRenderableComponent((defaultExport as Record<string, unknown>).Component)
  ) {
    return (defaultExport as Record<string, unknown>)
      .Component as ComponentType;
  }

  if (isRenderableComponent(moduleRecord.Component)) {
    return moduleRecord.Component as ComponentType;
  }

  return null;
}
