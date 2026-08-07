import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The design options were lettered before they were numbered. Anyone who
    // was sent an early link still lands in the right place.
    return ["a", "b", "c"].flatMap((letter, i) => {
      const n = i + 1;
      return [
        { source: `/design/${letter}`, destination: `/design/${n}`, permanent: false },
        { source: `/design/${letter}/plain`, destination: `/design/${n}/plain`, permanent: false },
      ];
    });
  },
};

export default nextConfig;
