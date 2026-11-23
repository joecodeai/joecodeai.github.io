/** Static export: the site is plain HTML/JS/CSS and can be hosted anywhere (GitHub Pages, Netlify, S3). */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
