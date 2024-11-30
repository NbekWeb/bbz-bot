/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboards',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
