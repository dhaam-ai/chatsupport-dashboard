import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  plugins: [pluginReact()],

  server: {
    port: 3001,
  },

  output: {
    publicPath: 'http://localhost:3001/', // REQUIRED for remote
  },

  tools: {
    postcss: (config) => {
      config.postcssOptions = {
        plugins: ['@tailwindcss/postcss'],
      };
    },

    rspack: {
      experiments: {
        moduleFederation: true,
      },
       output: {
        uniqueName: 'dashboard',  // ← ADD THIS
        publicPath: 'auto',       // ← ADD THIS
      },
      plugins: [
        new ModuleFederationPlugin({
          name: 'dashboard',
          filename: 'remoteEntry.js',

          exposes: {
            './App': './src/App.tsx',
          },

          shared: {
            react: { singleton: true, eager: true },
            'react-dom': { singleton: true, eager: true },
            'react-router-dom': { singleton: true, eager: true },
            'lucide-react': { singleton: true, eager: true },
          },

          dts: false,
        }),
      ],
    },
  },
});
