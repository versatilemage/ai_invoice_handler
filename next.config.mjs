/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: "/",
            destination: "/invoice",
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
