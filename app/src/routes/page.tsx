import { Helmet } from '@modern-js/runtime/head';
import './index.css';
import { loadRemotePlugin } from '@/plugins/plugin-loader';
import type { PageData } from '@/routes/page.data';
import { useLoaderData } from '@modern-js/runtime/router';
import type { RuntimePlugin } from '@orca/sdk';
import { useEffect, useState } from 'react';

export default () => {
  const data = useLoaderData<PageData>();
  const plugins = data.plugins;
  const [loadedPlugin, setLoadedPlugin] = useState<RuntimePlugin | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (plugins.length > 0) {
      loadRemotePlugin(plugins[0])
        .then(plugin => {
          setLoadedPlugin(plugin);
        })
        .catch(err => {
          setError(err.message);
          console.error('Failed to load plugin:', err);
        });
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
