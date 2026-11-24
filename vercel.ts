import { deploymentEnv, routes, type VercelConfig } from "@vercel/config/v1";

const renderBackendUrl = deploymentEnv("RENDER_BACKEND_URL");

export const config: VercelConfig = {
  rewrites: [
    routes.rewrite(
      "/api/:path*",
      `${renderBackendUrl}/api/:path*`
    ),
    routes.rewrite("/(.*)", "/index.html"),
  ],
};
