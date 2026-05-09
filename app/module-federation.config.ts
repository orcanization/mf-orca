import { createModuleFederationConfig } from '@module-federation/modern-js-v3';

export default createModuleFederationConfig({
  name: 'orca',
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
