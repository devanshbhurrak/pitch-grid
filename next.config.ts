import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

interface ExtendedNextConfig extends NextConfig {
  eslint?: {
    ignoreDuringBuilds?: boolean;
  };
}

const nextConfig: ExtendedNextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  experimental: {
    cacheComponents: true,
  },
  devIndicators: {
    position: "bottom-left",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withSentryConfig(nextConfig, {
  org: "devansh-zh",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
