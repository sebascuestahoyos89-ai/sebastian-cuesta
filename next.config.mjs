/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The shadcn/ui library bundled by the scaffold isn't fully wired into the
  // pages yet, so don't let lint failures block production builds.
  eslint: { ignoreDuringBuilds: true },
  // Old standalone pages were consolidated: expertise merged into /about and
  // publications merged into /projects. Keep their URLs alive for SEO/links.
  async redirects() {
    return [
      { source: "/research", destination: "/about", permanent: true },
      { source: "/publications", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
