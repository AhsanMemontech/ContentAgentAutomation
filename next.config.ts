import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // App Router handles body size limits differently
  // The API route will handle large files via FormData streaming
};

export default nextConfig;
