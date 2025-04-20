/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google profile pics
      "next-car-rental.s3.amazonaws.com", // S3 bucket
    ],
  },
};

export default nextConfig;
