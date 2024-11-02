import authRouter from "@/features/auth/server/auth.routes";
import { createRouter } from "@/server/utils/create-app";

const versionOneRoutes = createRouter().route("/auth", authRouter);

export default versionOneRoutes;
