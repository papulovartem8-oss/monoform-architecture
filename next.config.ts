import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images are already compressed WebP assets. Serving them directly avoids
  // relying on a runtime image-transform binding in the deployed worker.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
