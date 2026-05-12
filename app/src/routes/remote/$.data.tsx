import { apiClient } from '@/api/api-utils';
import type { Plugin } from '@/api/models';
import type { LoaderFunction } from '@modern-js/runtime/router';

export type RemoteRouteData = {
  plugins: Plugin[];
};

export const loader: LoaderFunction = async (): Promise<RemoteRouteData> => {
  try {
    console.log('LOADER IS RUNNING');
    const plugins = await apiClient().getPlugins();
    return { plugins };
  } catch (error) {
    console.error('Failed to load plugins for remote route:', error);
    return { plugins: [] };
  }
};
