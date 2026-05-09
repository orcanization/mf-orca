import { apiClient } from '@/api/api-utils';
import type { Plugin } from '@/api/models';
import type { ModuleFederation } from '@module-federation/runtime';

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
