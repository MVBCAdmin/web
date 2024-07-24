/** @type {import('next').NextConfig} */
const contentful = require("contentful");
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "https://kdee.imgix.net/",
    domains: ["images.ctfassets.net"],
  },
};

module.exports = nextConfig;
