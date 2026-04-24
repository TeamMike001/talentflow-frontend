const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  
  // This hides the annoying "Next.js is outdated" warning
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  
  // Optional: Improve build performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
