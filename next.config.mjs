/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   optimizeFonts: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//       },
//     ],
//     minimumCacheTTL: 1500000,
//   },
// };

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
