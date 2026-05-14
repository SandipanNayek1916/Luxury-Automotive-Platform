/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.imagin.studio" },
      { protocol: "https", hostname: "models.porsche.com" },
      { protocol: "https", hostname: "bmw.scene7.com" },
      { protocol: "https", hostname: "images.cdn.autocar.co.uk" },
      { protocol: "https", hostname: "cdn.renderhub.com" },
      { protocol: "https", hostname: "cdna.artstation.com" },
      { protocol: "https", hostname: "images.autodaily.com.au" },
      { protocol: "https", hostname: "www.premierfinancialservices.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "media.evo.co.uk" },
      { protocol: "https", hostname: "www.topgear.com" },
      { protocol: "https", hostname: "cdn.dribbble.com" },
      { protocol: "https", hostname: "www.netcarshow.com" },
      { protocol: "https", hostname: "cdn.motor1.com" },
      { protocol: "https", hostname: "images.drive.com.au" },
    ],
  },
};
module.exports = nextConfig;
