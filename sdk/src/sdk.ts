import type { FC } from 'react';

export type PluginCapability =
  | 'ui:render'
  | 'network:fetch'
  | 'storage:local'
  | `host-api:${string}`;

export interface HostPluginApi {
  sdkVersion: string;
  emitEvent: (type: string, data?: Record<string, unknown>) => void;
  requestCapability: (capability: PluginCapability) => boolean;
  getConfig: () => Record<string, unknown>;
}

export interface RuntimePlugin {
  id: string;
  Component: FC;
  init?: (api?: HostPluginApi) => Promise<void> | void;
  mount?: (api?: HostPluginApi) => Promise<void> | void;
  unmount?: (api?: HostPluginApi) => Promise<void> | void;
}

export interface RuntimePluginModule {
  default: RuntimePlugin;
}
