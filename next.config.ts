import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The design review is over and the chosen direction is now the site
    // itself. Links to the old preview URLs are still in people's messages.
    return ["a", "b", "c", "1", "2", "3"]
      .flatMap((key) => [
        { source: `/design/${key}`, destination: "/", permanent: false },
        { source: `/design/${key}/plain`, destination: "/", permanent: false },
      ])
      .concat([
        { source: "/design", destination: "/", permanent: false },
        { source: "/credits", destination: "/", permanent: true },
      ]);
  },
};

export default nextConfig;
