/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The dummy generation API returns remote media, so we allowlist only the
    // hosts we actually request from (next/image blocks everything else).
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
