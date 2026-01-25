import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
// Workaround Handlebar import issues
// https://github.com/handlebars-lang/handlebars.js/issues/953
// webpack: (config) => {
//   config.resolve.alias["handlebars"] = "handlebars/dist/handlebars.js";
//   return config;
// },
// Workaround jaegar dependency errors
// https://github.com/open-telemetry/opentelemetry-js/pull/4214

export default nextConfig;
