/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.ibb.co",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "i.ibb.co.com",
                port: "",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;
