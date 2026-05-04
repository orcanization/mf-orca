import { apiClient } from '@/api/api-utils';
import type { Plugin } from '@/api/models';

export type PageData = {
  plugins: Plugin[];
};

export const loader = async (): Promise<PageData> => {
  const client = apiClient();
  try {
    console.log('Ah');
    const plugins = await client.getPlugins();
    return { plugins };
  } catch (e) {
    console.log(e);
    return { plugins: [] };
  }
};
