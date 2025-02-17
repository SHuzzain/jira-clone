import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));


(async () => await jiti.import("./src/config/env.ts"))();


/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    serverExternalPackages: ["pino", "pino-pretty"],
    transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
};

export default nextConfig;
