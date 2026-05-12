import {
  loadRemotePlugins,
  resolveRemoteComponent,
} from '@/plugins/plugin-loader';
import type { RootLayoutData } from '@/routes/layout';
import { useOutletContext } from '@modern-js/runtime/router';
import { getInstance } from '@module-federation/runtime';
import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

const ErrorBoundary = (info?: { error: { message: string } }) => {
  return (
    <div>
      <h2>This is ErrorBoundary Component, Something went wrong:</h2>
      <pre style={{ color: 'red' }}>{info?.error.message}</pre>
    </div>
  );
};

const Loading = <div>loading...</div>;

export default function RemoteApp() {
  const { plugins } = useOutletContext<RootLayoutData>();

  const [loadedApp, setLoadedApp] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const LoadedApp = loadedApp;

  useEffect(() => {
    window.__ORCA_API_URL__ = 'http://localhost:8888';

    const mfInstance = getInstance();
    if (!mfInstance) {
      setIsLoading(false);
      throw new Error('Module Federation instance is not initialized');
    }

    loadRemotePlugins(mfInstance, plugins);

    // Dynamically load the remote app
    mfInstance
      .loadRemote('project_stats/app')
      .then(module => {
        const remoteComponent = resolveRemoteComponent(module);

        if (!remoteComponent) {
          throw new Error(
            'Remote app "project_stats" did not export a renderable component',
          );
        }

        setLoadedApp(() => remoteComponent);
      })
      .catch(err => {
        setError(err.message);
        console.error('Failed to load remote app:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [plugins]);

  if (isLoading) {
    return Loading;
  }

  if (error) {
    return ErrorBoundary({ error: { message: error } });
  }

  return LoadedApp ? <LoadedApp /> : null;
}
