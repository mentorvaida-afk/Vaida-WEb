import nextConfig from "eslint-config-next";

// eslint-config-next 16 ships native flat config, no FlatCompat/legacy shim needed.
const config = [{ ignores: [".vercel/**"] }, ...nextConfig];

export default config;
