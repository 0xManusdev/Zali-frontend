import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
	turbopack: {
		root: __dirname,
	},
	images: {
		qualities: [100, 75],
	},
};

export default nextConfig;
