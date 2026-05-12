import { apiClient } from '@/api/api-utils';
import type { Plugin } from '@/api/models';
import {
  type LoaderFunction,
  Outlet,
  useLoaderData,
} from '@modern-js/runtime/router';

export type RootLayoutData = {
  plugins: Plugin[];
};

export const loader: LoaderFunction = async () => {
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

export default function Layout() {
  const data = useLoaderData<RootLayoutData>();

  return (
    <div>
      <Outlet context={data} />
    </div>
  );
}
