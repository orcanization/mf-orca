import { createModuleFederationConfig } from '@module-federation/modern-js-v3';

export default createModuleFederationConfig({
  name: 'orca',
  shared: {
    react: {
      singleton: true,
      strictVersion: false,
      requiredVersion: '^19.0.0',
      eager: true,
    },
    'react-dom': {
      singleton: true,
      strictVersion: false,
      requiredVersion: '^19.0.0',
      eager: true,
    },
    'react/jsx-runtime': {
      singleton: true,
      strictVersion: false,
      requiredVersion: '^19.0.0',
      eager: true,
    },
    'react/jsx-dev-runtime': {
      singleton: true,
      strictVersion: false,
      requiredVersion: '^19.0.0',
      eager: true,
    },
  },
});
