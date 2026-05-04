import { apiClient } from '@/api/api-utils';
import type { Plugin } from '@/api/models';
import { getInstance } from '@module-federation/runtime';
import type { RuntimePlugin, RuntimePluginModule } from '@orca/sdk';

async function loadRemotePlugin(plugin: Plugin): Promise<RuntimePlugin> {
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
  const pluginModule = await mf.loadRemote<RuntimePluginModule>(
    plugin.id.toString(),
  );
  if (!pluginModule) {
    throw new Error(`Failed to load plugin module for plugin "${plugin.name}"`);
  }

  return pluginModule.default;
}
