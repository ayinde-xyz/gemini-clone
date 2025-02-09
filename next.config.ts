import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "40mb",
    },
    turbo: {
      resolveAlias: {
        handlebars: "handlebars/dist/handlebars.js",
      },
    },
  },
  // Workaround Handlebar import issues
  // https://github.com/handlebars-lang/handlebars.js/issues/953
  // webpack: (config) => {
  //   config.resolve.alias["handlebars"] = "handlebars/dist/handlebars.js";
  //   return config;
  // },
  // Workaround jaegar dependency errors
  // https://github.com/open-telemetry/opentelemetry-js/pull/4214

  serverExternalPackages: [
    "@opentelemetry/auto-instrumentations-node",
    "@opentelemetry/sdk-node",
  ],
};

export default nextConfig;
