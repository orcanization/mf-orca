import { apiClient } from '@/api/api-utils';
import type { Plugin } from '@/api/models';
import { getInstance } from '@module-federation/runtime';

async function loadRemotePlugin(plugin: Plugin) {
  const entryUrl = apiClient().getPluginUrl(plugin);

  const mf = getInstance();
  if (!mf) {
    throw new Error(`Failed to create mf instance for plugin "${plugin.name}"`);
  }

  mf.registerRemotes([
    {
      name: plugin.id.toString(),
      alias: plugin.name,
      entry: entryUrl,
    },
  ]);
  // const pluginModule = await mf.loadRemote<>(plugin.id.toString())
}
