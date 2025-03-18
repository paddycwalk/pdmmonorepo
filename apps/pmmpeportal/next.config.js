/** @type {import('next').NextConfig} */
import path from "path";
const __dirname = path.resolve();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bosch-hc-pm-mpe-portal-frontend.kittelberger.net",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "../../packages/ui/styles")],
    prependData: `@use 'mixins' as *;`,
  },
  env: {
    CUSTOM_ENV: process.env.NODE_ENV,
  },
};

export default nextConfig;
