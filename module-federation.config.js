export const mfConfig = {
  name: "dashboard",
  filename: "remoteEntry.js",
  exposes: {
    "./App": "./src/App.tsx",
  },
  shared: {
    react: { singleton: true, eager: true },
    "react-dom": { singleton: true, eager: true },
    "react-router-dom": { singleton: true, eager: true },
    "react-redux": { singleton: true, eager: true },
    "@reduxjs/toolkit": { singleton: true, eager: true },
    "lucide-react": { singleton: true, eager: true },
  },
  dts: false,
};
