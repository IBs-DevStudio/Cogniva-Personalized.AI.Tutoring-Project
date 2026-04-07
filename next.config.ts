import {withSentryConfig} from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript:{
    ignoreBuildErrors:true
  },
  eslint:{
    ignoreDuringBuilds:true
  },
 images:{
  remotePatterns:[
    {hostname:'img.clerk.com'}
  ]
 }
};

const sentryConfig = withSentryConfig(nextConfig, {
 org: "student-7wu",
 project: "javascript-nextjs",
 silent: !process.env.CI,
 widenClientFileUpload: true,
 tunnelRoute: "/monitoring",
 disableLogger: true,
 automaticVercelMonitors: true
});

(sentryConfig as any).eslint = { ignoreDuringBuilds: true };

export default sentryConfig;