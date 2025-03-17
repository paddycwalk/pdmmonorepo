/** @type {import('next').NextConfig} */
import path from "path";
const __dirname = path.resolve();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
      {
        protocol: "https",
        hostname: "bosch-hc-viewport-frontend.kittelberger.net",
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
  distDir: "build",
};

export default nextConfig;
