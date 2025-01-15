// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/analise-equivalencias",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;