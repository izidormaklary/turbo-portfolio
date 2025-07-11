import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://ik.imagekit.io/izidor/**")],
  },
  experimental: {
    useCache: true,
  },
};

export default nextConfig;
