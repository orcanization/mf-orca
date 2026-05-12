import { loadRemotePlugins } from '@/plugins/plugin-loader';
import { useLoaderData } from '@modern-js/runtime/router';
import { createRemoteAppComponent } from '@module-federation/modern-js-v3/react';
import { getInstance } from '@module-federation/runtime';
import { useEffect } from 'react';
import type { RemoteRouteData } from './$.data';

const ErrorBoundary = (info?: { error: { message: string } }) => {
  return (
    <div>
      <h2>This is ErrorBoundary Component, Something went wrong:</h2>
      <pre style={{ color: 'red' }}>{info?.error.message}</pre>
    </div>
  );
};
const Loading = <div>loading...</div>;

export default function Page() {
  const { plugins } = useLoaderData<RemoteRouteData>();

  useEffect(() => {
    window.__ORCA_API_URL__ = 'http://localhost:8888';

    const mfInstance = getInstance();
    if (!mfInstance)
      throw new Error('Module Federation instance is not initialized');

    loadRemotePlugins(mfInstance, plugins);
  }, [plugins]);

  return createRemoteAppComponent({
    loader: () => loadRemote('project_stats/app'),
    fallback: ErrorBoundary,
    loading: Loading,
  });
}
