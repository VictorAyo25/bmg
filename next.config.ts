import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Option 1 was chosen, so the other two directions are gone. Early links
    // went out lettered and later numbered, and both forms still exist in
    // people's messages, so everything lands on the surviving design.
    const stale = ["a", "b", "c", "2", "3"];
    return stale.flatMap((key) => [
      { source: `/design/${key}`, destination: "/design/1", permanent: false },
      {
        source: `/design/${key}/plain`,
        destination: "/design/1/plain",
        permanent: false,
      },
    ]);
  },
};

export default nextConfig;
