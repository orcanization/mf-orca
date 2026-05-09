import { Helmet } from '@modern-js/runtime/head';
import './index.css';
import { loadRemotePlugins } from '@/plugins/plugin-loader';
import type { PageData } from '@/routes/page.data';
import { useLoaderData } from '@modern-js/runtime/router';
import { getInstance } from '@module-federation/runtime';
import type { RuntimePlugin } from '@orca/sdk';
import { useEffect, useState } from 'react';

export default () => {
  const data = useLoaderData<PageData>();
  const plugins = data.plugins;
  const [loadedPlugin, setLoadedPlugin] = useState<RuntimePlugin | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (plugins.length > 0) {
      window.__ORCA_API_URL__ = 'http://localhost:8888';

      const mfInstance = getInstance();
      if (!mfInstance)
        throw new Error('Module Federation instance is not initialized');

      loadRemotePlugins(mfInstance, plugins);

      for (const plugin of plugins) {
        mfInstance
          .loadRemote(plugin.id.toString())
          .then(module => {
            const typedModule = module as { default: RuntimePlugin };
            setLoadedPlugin(typedModule.default);
          })
          .catch(err => {
            setError(err.message);
            console.error('Failed to load plugin:', err);
          });
      }
    }
  }, [plugins]);

  return (
    <div className="container-box">
      <Helmet>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/favicon.ico"
        />
      </Helmet>

      <p>Installed plugins</p>
      {plugins.map((plugin, index) => (
        <p key={`${plugin.name}-${index}`}>{plugin.name}</p>
      ))}

      <div className="landing-page">
        {error && <p>Error loading plugin: {error}</p>}
        {loadedPlugin && <loadedPlugin.Component />}
      </div>
    </div>
  );
};
